import * as fs from "fs";

export interface FileOperations {
  isFileOlderThanMaxAge(path: string, maxAgeInMilliseconds: number): boolean;
  doesFileExist(path: string): boolean;
  getFileAge(path: string): number;
  getFileLastModificationDate(path: string): Date;
  readJsonFile(path: string): object | never;
  readFile(path: string): Buffer;
}

export class FileOperationsFs implements FileOperations {
  isFileOlderThanMaxAge(path: string, maxAgeInMilliseconds: number): boolean {
    return this.getFileAge(path) > maxAgeInMilliseconds;
  }

  doesFileExist(path: string): boolean {
    return fs.existsSync(path);
  }

  getFileAge(path: string): number {
    return Date.now() - this.getFileLastModificationDate(path).getTime();
  }

  getFileLastModificationDate(path: string): Date {
    return fs.statSync(path).mtime;
  }

  readJsonFile(path: string): object | never {
    try {
      const jsonContent = JSON.parse(
        fs.readFileSync(path, "utf-8"),
      ) as unknown as object;
      return jsonContent;
    } catch (error) {
      throw new Error(
        `It was not possible to parse the file: ${path} to JSON, error ${String(error)}`,
      );
    }
  }

  readFile(path: string): Buffer {
    return fs.readFileSync(path);
  }
}
