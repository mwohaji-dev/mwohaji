import _ from 'lodash';

export default function tsvToJSON(csv: string) {
  const [header, ...rows] = csv.split('\n');
  const columns = header.split('\t');

  return rows.map(row =>
    _.chain(row)
      .split('\t')
      .map((cell, index) => [columns[index], cell])
      .fromPairs()
      .value(),
  ) as any; // TODO
}
