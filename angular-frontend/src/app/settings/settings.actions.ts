export class GetGoogleSheets {
  static readonly type = '[Settings] Fetch Google sheets';

  constructor(public token: string) {}
}
