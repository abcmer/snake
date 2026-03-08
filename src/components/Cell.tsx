'use client';

interface CellProps {
  id: string;
  row: number;
  col: number;
  cellValue: number;
}

export default function Cell({ id, cellValue }: CellProps) {
  const cellStyle = (): React.CSSProperties => {
    if (cellValue === 1) {
      return { backgroundColor: '#78BD1F' }; // snake green
    } else if (cellValue === 2) {
      return { backgroundColor: 'red' };
    } else {
      return { backgroundColor: '#0A233F' }; // background navy blue
    }
  };

  return <div id={id} className="grid-item" style={cellStyle()}></div>;
}
