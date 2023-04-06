import { Pipe, PipeTransform } from '@angular/core';
import { ProposalStatus } from '../models/proposal';

@Pipe({
  name: 'statusToDisplayName',
})
export class StatusToDisplayNamePipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): string {
    switch (value) {
      case ProposalStatus.Nieuw:
        return 'Nieuw';
      case ProposalStatus.Bevestigd:
        return 'Bevestigd';
      case ProposalStatus.InReview:
        return 'In Review';
      case ProposalStatus.ReviewOntvangen:
        return 'Review ontvangen';
      case ProposalStatus.InFeedBack:
        return 'In Feedback';
      case ProposalStatus.FeedBackOntvangen:
        return 'Feedback Ontvangen';
      case ProposalStatus.Goedgekeurd:
        return 'Goedgekeurd';
      case ProposalStatus.Afgekeurd:
        return 'Afgekeurd';
      case ProposalStatus.Published:
        return 'Gepubliceerd';
      default:
        return 'Onbekende status';
    }
  }
}
