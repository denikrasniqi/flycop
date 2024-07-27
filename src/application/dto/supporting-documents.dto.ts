export class SupportingDocumentsDTO {
    documents: FileAttachment[];
  }
  
  export class FileAttachment {
    fileName: string;
    fileType: string;
    content: Blob; // Or any suitable type for file content
  }