import { Worksheet } from 'exceljs';

export function formatSheet(sheet: Worksheet, headers: string[], data: any) {
  //render headers
  sheet.addRow(headers);

  //append data
  if (data)
    data.forEach((item: any) => {
      const rowData = Object.values(item);
      sheet.addRow(rowData);
    });

  sheet.columns.map((column) => (column.width = 20));
  sheet.getColumn(1).width = 50;

  //setting all row height and font size
  sheet.eachRow((row) => {
    row.height = 20;
    row.font = { size: 14 };
  });

  //setting header
  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true, size: 16, color: { argb: 'FFFFFF' } };
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF3680f7' },
    };
    /*cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };*/
  });
}
