import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class HelperService {
  public readFileIntoArray(filePath: string): string[] {
    try {
      // Read the file synchronously (you can use asynchronous methods as well)
      const fileContent = fs.readFileSync(filePath, 'utf-8');

      // Split the content into an array of strings based on newline characters
      const lines = fileContent.split('\n');

      // Remove any leading or trailing whitespaces from each line
      return lines.map((line) => line.trim());
    } catch (error) {
      // Handle errors (e.g., file not found, permissions issues)
      console.error(`Error reading file: ${error.message}`);
      return [];
    }
  }
}
