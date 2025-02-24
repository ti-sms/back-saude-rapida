 export type ListOutPutDto = {
    id: string;
    name: string;
    description: string | null
  };

  export interface SecretaryService {
    list(): Promise<ListOutPutDto[]>;
  }
  