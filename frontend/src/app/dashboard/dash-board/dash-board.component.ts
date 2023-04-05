import { Component, OnInit } from '@angular/core';
import { ProposalService } from '../../proposal/proposal.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss'],
})
export class DashBoardComponent implements OnInit {
  proposals: any = [];

  nieuw: number = 0;
  bevestigd: number = 0;
  inReview: number = 0;
  reviewOntvangen: number = 0;
  inFeedback: number = 0;
  goedGekeurd: number = 0;
  afGekeurd: number = 0;
  published: number = 0;

  title: any = '';
  type: any = 'BarChart';
  typeDonut: any = 'PieChart';
  data: any = [];
  dataDonut: any = [];
  columnNames = ['', 'Status', 'Stagevoorstellen'];
  options = {
    chartArea: { width: '50%' },
    isStacked: true,
    legend: {
      position: 'bottom',
    },

    hAxis: {
      minValue: 0,
      textStyle: {
        fontSize: 8,
      },
    },
    vAxis: {
      viewWindow: {
        minValue: 0,
      },
    },
  };
  width = 500;
  height = 250;

  optionsDonut = {
    pieHole: 0.4,
  };
  widthDonut = 500;
  heightDonut = 250;

  constructor(private proposalservice: ProposalService) {}

  ngOnInit(): void {
    this.proposalservice.getProposals().subscribe((res) => {
      this.proposals = res;
      this.processStatus(this.proposals);
      this.data = [
        ['Bevestigd', this.bevestigd, this.nieuw],
        ['In review', this.inReview, this.nieuw],
        ['Review ontvangen', this.reviewOntvangen, this.nieuw],
        ['In feedback', this.inFeedback, this.nieuw],
        ['Goedgekeurd', this.goedGekeurd, this.nieuw],
        ['Afgekeurd', this.afGekeurd, this.nieuw],
        ['Gepubliceerd', this.published, this.nieuw],
      ];
      this.dataDonut = [
        ['Totaal', this.nieuw],
        ['Bevestigd', this.bevestigd],
        ['In review', this.inReview],
        ['Review ontvangen', this.reviewOntvangen],
        ['In feedback', this.inFeedback],
        ['Goedgekeurd', this.goedGekeurd],
        ['Afgekeurd', this.afGekeurd],
        ['Gepubliceerd', this.published],
      ];
    });
  }

  processStatus(proposal: any[]) {
    for (let item of proposal) {
      switch (item.status) {
        case 'Nieuw':
          this.nieuw++;
          break;
        case 'Bevestigd':
          this.bevestigd++;
          break;
        case 'InReview':
          this.inReview++;
          break;
        case 'ReviewOntvangen':
          this.reviewOntvangen++;
          break;
        case 'InFeedBack':
          this.inFeedback++;
          break;
        case 'Goedgekeurd':
          this.goedGekeurd++;
          break;
        case 'Afgekeurd':
          this.afGekeurd++;
          break;
        case 'Published':
          this.published++;
          break;
        default:
          break;
      }
    }
  }
}
