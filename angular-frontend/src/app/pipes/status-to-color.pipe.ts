import { Pipe, PipeTransform } from '@angular/core';
import { ProposalStatus } from '../models/proposal';

@Pipe({
  name: 'statusToColor',
})
export class StatusToColorPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case ProposalStatus.Nieuw:
        return '#E5E1E2';
      case ProposalStatus.Bevestigd:
        return '#9bc1fd';
      case ProposalStatus.InReview:
        return '#f9eb73';
      case ProposalStatus.ReviewOntvangen:
        return '#85d4fb';
      case ProposalStatus.InFeedBack:
        return '#f4cafc';
      case ProposalStatus.Goedgekeurd:
        return '#acf3bb';
      case ProposalStatus.Afgekeurd:
        return '#fc7b64';
      default:
        return '#33FFC1';
    }
  }
}
