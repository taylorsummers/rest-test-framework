export type APIList = [
  {
    labels: string;
    createTime: {
      nanos: number;
      seconds: string;
    };
    updateTime: {
      nanos: number;
      seconds: string;
    };
    managedService: string;
    name: string;
    displayName: string;
    state: string;
  }
];
