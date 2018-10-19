declare namespace broadcast {
  type PlayerOptions = {
    server: string;
    port: number;
  };

  // factories

  interface IAxPhone {
    Play(ids: number[]);
    Stop(ids: number[]);
  }

  interface IAxPhoneFactory {
    (): IAxPhone;
  }
}

export as namespace broadcast;
export = broadcast;
