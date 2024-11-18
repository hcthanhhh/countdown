export default class NodeUtils {
  static initializeDefaultNodeData = (nodeParams: any) => {
    const initialValues: any = {};

    for (let i = 0; i < nodeParams.length; i += 1) {
      const input = nodeParams[i];
      initialValues[input.name] = input.default || '';
    }

    return initialValues;
  };

  static initNode = (nodeData: any, newNodeId: any) => {
    const inputAnchors = [];
    const inputParams = [];
    const incoming = nodeData.inputs ? nodeData.inputs.length : 0;
    const outgoing = 1;

    const whitelistTypes = [
      'asyncOptions',
      'options',
      'multiOptions',
      'datagrid',
      'string',
      'number',
      'boolean',
      'password',
      'json',
      'code',
      'date',
      'file',
      'folder',
    ];

    // Inputs
    for (let i = 0; i < incoming; i += 1) {
      const newInput = {
        ...nodeData.inputs[i],
        id: `${newNodeId}-input-${nodeData.inputs[i].name}-${nodeData.inputs[i].type}`,
      };
      if (whitelistTypes.includes(nodeData.inputs[i].type)) {
        inputParams.push(newInput);
      } else {
        inputAnchors.push(newInput);
      }
    }

    // Credential
    if (nodeData.credential) {
      const newInput = {
        ...nodeData.credential,
        id: `${newNodeId}-input-${nodeData.credential.name}-${nodeData.credential.type}`,
      };
      inputParams.unshift(newInput);
    }

    // Outputs
    const outputAnchors = [];
    for (let i = 0; i < outgoing; i += 1) {
      if (nodeData.outputs && nodeData.outputs.length) {
        const options = [];
        for (let j = 0; j < nodeData.outputs.length; j += 1) {
          let baseClasses = '';
          let type = '';

          const outputBaseClasses = nodeData.outputs[j].baseClasses ?? [];
          if (outputBaseClasses.length > 1) {
            baseClasses = outputBaseClasses.join('|');
            type = outputBaseClasses.join(' | ');
          } else if (outputBaseClasses.length === 1) {
            baseClasses = outputBaseClasses[0];
            type = outputBaseClasses[0];
          }

          const newOutputOption = {
            id: `${newNodeId}-output-${nodeData.outputs[j].name}-${baseClasses}`,
            name: nodeData.outputs[j].name,
            label: nodeData.outputs[j].label,
            description: nodeData.outputs[j].description ?? '',
            type,
          };
          options.push(newOutputOption);
        }
        const newOutput = {
          name: 'output',
          label: 'Output',
          type: 'options',
          description: nodeData.outputs[0].description ?? '',
          options,
          default: nodeData.outputs[0].name,
        };
        outputAnchors.push(newOutput);
      } else {
        const newOutput = {
          id: `${newNodeId}-output-${nodeData.name}-${nodeData.baseClasses.join('|')}`,
          name: nodeData.name,
          label: nodeData.type,
          description: nodeData.description ?? '',
          type: nodeData.baseClasses.join(' | '),
        };
        outputAnchors.push(newOutput);
      }
    }

    /* Initial
    inputs = [
        {
            label: 'field_label_1',
            name: 'string'
        },
        {
            label: 'field_label_2',
            name: 'CustomType'
        }
    ]

    =>  Convert to inputs, inputParams, inputAnchors

    =>  inputs = { 'field': 'defaultvalue' } // Turn into inputs object with default values
    
    =>  // For inputs that are part of whitelistTypes
        inputParams = [
            {
                label: 'field_label_1',
                name: 'string'
            }
        ]

    =>  // For inputs that are not part of whitelistTypes
        inputAnchors = [
            {
                label: 'field_label_2',
                name: 'CustomType'
            }
        ]
    */

    // Inputs
    if (nodeData.inputs) {
      nodeData.inputAnchors = inputAnchors;
      nodeData.inputParams = inputParams;
      nodeData.inputs = this.initializeDefaultNodeData(nodeData.inputs);
    } else {
      nodeData.inputAnchors = [];
      nodeData.inputParams = [];
      nodeData.inputs = {};
    }

    // Outputs
    if (nodeData.outputs) {
      nodeData.outputs = this.initializeDefaultNodeData(outputAnchors);
    } else {
      nodeData.outputs = {};
    }
    nodeData.outputAnchors = outputAnchors;

    // Credential
    if (nodeData.credential) nodeData.credential = '';

    nodeData.id = newNodeId;

    return nodeData;
  };
}
