import { FileType } from '@/common/enums';
import { HttpResponse } from '@/interfaces/common.interfaces';
import type { RcFile } from 'antd/es/upload';
import axios from 'axios';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import FileSaver from 'file-saver';
import { toast } from 'react-toastify';

dayjs.extend(duration);
dayjs.extend(relativeTime);

// const AVA_DEFAULT =
//   "data:image/svg+xml,%3Csvg  width='100%' height='100%' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' preserveAspectRatio='xMidYMid slice' focusable='false'%3E%3Crect width='100%25' height='100%25' fill='%23e6e6e6'%3E%3C/rect%3E%3C/svg%3E";

export default class FileUtils {
  static beforeUpload = (file: RcFile, limitSize: number, isNotImage?: boolean) => {
    if (!isNotImage) {
      const isJpgOrPng =
        file.type === FileType.JPEG || file.type === FileType.PNG || file.type === FileType.JPG;
      if (!isJpgOrPng) {
        toast.error('Vui lòng chọn file ảnh (jpg, jpeg, png)');
      }
      const isLt2M = file.size / 1024 / 1024 < limitSize;
      if (!isLt2M) {
        toast.error(`Vui lòng chọn file nhỏ hơn ${limitSize} MB`);
      }
      return isJpgOrPng && isLt2M;
    }
    const isLt2M = file.size / 1024 / 1024 < limitSize;
    if (!isLt2M) {
      toast.error(toast.error(`Vui lòng chọn file nhỏ hơn ${limitSize} MB`));
    }
    return isLt2M;
  };

  static getBase64 = (img: RcFile | Blob, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  // static namingFileConvention = ({
  //   domainName,
  //   tenantId,
  //   ext,
  // }: {
  //   domainName: string;
  //   tenantId: string;
  //   ext: string;
  // }) => {
  //   return `${domainName}-${tenantId}-${uuid4()}.${ext}`;
  // };

  static handleDownloadFile = async ({
    linkFile,
    name,
    ext,
  }: {
    linkFile: string;
    name: string;
    ext: string;
  }) => {
    // const response = await fetch(linkFile);
    // const fileBlob = await response.blob();
    // const fileUrl = URL.createObjectURL(fileBlob);
    // const link = document.createElement("a");
    // link.href = fileUrl;
    // link.setAttribute("download", `${name}.${ext}`);
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    // URL.revokeObjectURL(fileUrl);
    fetch(linkFile)
      .then((response) => response.blob())
      .then((blob) => {
        FileSaver.saveAs(blob, `${name}.${ext}`);
      })
      .catch((error) => {
        console.error('Error downloading the file:', error);
        toast.error(error.message);
      });
  };

  static convertFileSize(bytes: number, from: string = 'Bytes', to: string = 'MB'): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = sizes.indexOf(from);
    const j = sizes.indexOf(to);
    return `${(bytes / 1024 ** (j - i)).toFixed(2)} ${to}`;
  }

  static downloadBlobFile = async (params: { url: string; filter: any; config: any }) => {
    const { config, filter, url } = params;
    const res = await axios.get<HttpResponse<any>>(url, {
      params: filter,
      headers: {
        Authorization: `Bearer ${config?.token}`,
      },
      responseType: 'blob',
    });
    return res;
  };

  static normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
}
