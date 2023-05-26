import React, { useState, useEffect, useRef } from 'react';

interface RowData {
    id: number;
    name: string;
    age: string;
    // 其他列数据
}

export interface Column {
    dataIndex: string;
    title: string;
    width?: number;
    textAlign?: 'left' | 'right' | 'center';
    flexGrow?: number;
    // 其他列属性
}

interface TableProps {
    columns: Column[];
    rows: RowData[];
    rowHeight: number;
    visibleRows: number;
}

// columns width
const fitTableColumnsWidth = (columns: Column[], ref: React.RefObject<HTMLDivElement>) => {
    let totalWidth = columns.reduce((total, column) => {
        if (column.width) {
            return total + column.width;
        }
        return total;
    }, 0);

    const containerWidth = (ref as any).current?.clientWidth;
    const remainingWidth = containerWidth - totalWidth; // 设置默认总宽度为100%，可根据实际情况调整

    const flexibleColumns = (columns as Column[]).filter((column) => !column.width);
    const flexibleWidth = Math.max(remainingWidth / flexibleColumns.length, 100);

    const newColumns = (columns).map((column) => ({
        ...column,
        width: (column.width || flexibleWidth) - 2,
    }))

    totalWidth = newColumns.reduce((total, column) => {
        if (column.width) {
            return total + column.width + 2;
        }
        return total;
    }, 0);

    return {
        newColumns,
        containerWidth,
        totalWidth
    };
}

const VirtualTable: React.FC<TableProps> = ({ columns, rows, rowHeight, visibleRows }) => {
    const [scrollTop, setScrollTop] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const [visibleData, setVisibleData] = useState<any[]>([]);
    const [containerWidth, setContainerWidth] = useState(0);
    const tableRef = useRef<HTMLDivElement>(null);
    const [adjustedColumns, setAdjustedColumns] = useState<Column[]>(columns);

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop } = event.currentTarget;
        setScrollTop(scrollTop);
    };

    const totalHeight = rows.length * rowHeight; // 计算总高度
    const [totalWidth, setTotalWidth] = useState(0);

    // 设置 table columns --------------------------------------

    useEffect(() => {
        const { newColumns, containerWidth, totalWidth } = fitTableColumnsWidth(columns, tableRef); // columns width 相关

        if (containerWidth) {
            setContainerWidth(containerWidth);
            setTotalWidth(totalWidth);
            setAdjustedColumns(newColumns);
        }
    }, [columns])

    // ---------------------------------------------------------

    useEffect(() => {
        if (tableRef.current) {
            const newStartIndex = Math.floor(scrollTop / rowHeight);
            setStartIndex(newStartIndex);
        }
    }, [scrollTop, rowHeight]);

    useEffect(() => {
        if (startIndex + visibleRows <= rows.length) {
            setVisibleData(rows.slice(startIndex, startIndex + visibleRows));
        }
    }, [startIndex, visibleRows, rows])

    return (
        <div className="table-container" style={{ width: '100%', overflowX: 'auto' }} ref={tableRef}>
            <div style={{ width: containerWidth, overflowX: 'scroll' }}>
                <table className="table-header">
                    <thead>
                        <tr>
                            {adjustedColumns.map((column) => (
                                <th
                                    key={column.dataIndex}
                                    style={{ width: column.width, minWidth: column.width, textAlign: column?.textAlign || 'left' }}
                                >
                                    {column.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                </table>
                <div
                    style={{ height: rowHeight * visibleRows, overflowY: 'scroll', width: totalWidth }} // 设置总高度和滚动属性
                    onScroll={handleScroll}
                    ref={tableRef}
                >
                    <div style={{ height: totalHeight, width: totalWidth, overflow: 'hidden' }}>
                        <table className="table-body" style={{ paddingTop: startIndex * rowHeight }}>
                            <tbody>
                                {visibleData.map((row) => (
                                    <tr key={row.id} style={{ height: rowHeight }}>
                                        {adjustedColumns.map((column) => (
                                            <td key={column.dataIndex} style={{ width: column.width, minWidth: column.width }}>
                                                <div style={{
                                                    width: column.width,
                                                    textAlign: column.textAlign || 'left',
                                                }}>
                                                    {row[column.dataIndex]}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default VirtualTable;
