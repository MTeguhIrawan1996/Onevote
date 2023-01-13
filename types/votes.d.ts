interface Votes {
  id: string;
  publisher: string;
  title: string;
  code: string;
  startDateTime: string;
  endDateTime: string;
  candidate: Candidate[];
  createdAt: string;
  totalVotes: number;
}
