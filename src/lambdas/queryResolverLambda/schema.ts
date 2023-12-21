export interface Event {
  arguments: { id: string };
  identity: any;
  source: any;
  request: {
    headers: {
      [key: string]: string;
      // Headers details here
    };
    domainName: string | null;
    // Other request details here
  };
  prev: any;
  info: {
    parentTypeName: string;
    variables: any;
    selectionSetList: string[];
    selectionSetGraphQL: string;
    fieldName: string;
  };
  stash: any;
}
