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
    height?: number;
}

// columns width
const fitTableColumnsWidth = (columns: Column[], ref: React.RefObject<HTMLDivElement>) => {
    let vaildWidth = columns.reduce((total, column) => {
        if (column.width) {
            return total + column.width;
        }
        return total;
    }, 0);

    const containerWidth = (ref as any).current?.clientWidth;
    const remainingWidth = containerWidth - vaildWidth; // 设置默认总宽度为100%，可根据实际情况调整

    const flexibleColumns = (columns as Column[]).filter((column) => !column.width);
    const flexibleWidth = Math.max(remainingWidth / flexibleColumns.length, 100);

    const adjustedColumns = (columns).map((column) => ({
        ...column,
        width: (column.width || flexibleWidth) - 2,
    }))

    const totalWidth = adjustedColumns.reduce((total, column) => {
        if (column.width) {
            return total + column.width + 2;
        }
        return total;
    }, 0);

    return {
        adjustedColumns,
        containerWidth,
        totalWidth
    };
}

const VirtualTable: React.FC<TableProps> = ({ columns, rows, rowHeight, visibleRows, height = 300 }) => {
    const tableRef = useRef<HTMLDivElement>(null);
    const [startIndex, setStartIndex] = useState(0);
    const [visibleData, setVisibleData] = useState<typeof rows | []>([]);
    const [totalHeight, setTotalHeight] = useState(0);
    const [totalWidth, setTotalWidth] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const [adjustedColumns, setAdjustedColumns] = useState<Column[]>(columns);

    // ---------------------------------------------------------

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop } = (event as React.UIEvent<HTMLDivElement>)?.currentTarget;
        const diff = scrollTop - rowHeight * 10;
        const index = diff > 0 ? Math.floor(diff / rowHeight) : 0;

        setStartIndex(index);
        setVisibleData(rows.slice(index, index + visibleRows));
    };

    // init ---------------------------------------------------

    const initData = () => {
        setVisibleData(rows.slice(0, visibleRows));
    }

    const initWidth = () => {
        const { adjustedColumns, containerWidth, totalWidth } = fitTableColumnsWidth(columns, tableRef); // columns width 相关

        setContainerWidth(containerWidth);
        setTotalWidth(totalWidth);
        setAdjustedColumns(adjustedColumns);
    }

    // useEffect ----------------------------------------------

    useEffect(() => {
        initData(); // init visible data
        initWidth(); // init columns width
    }, [])

    useEffect(() => {
        setTotalHeight(Math.ceil(rows.length * rowHeight))
    }, [rows, rowHeight])

    // ---------------------------------------------------------

    return (
        <div className="table-container" style={{ width: '100%', overflowX: 'auto' }} ref={tableRef}>
            <div style={{ width: containerWidth, overflowX: 'scroll' }}>
                <div className="table-header-contaienr">
                    <table className="table-header">
                        <thead>
                            <tr>
                                {adjustedColumns.map((column, index) => (
                                    <th
                                        key={index}
                                        style={{ width: column.width, minWidth: column.width, textAlign: column?.textAlign || 'left' }}
                                    >
                                        {column.title}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                    </table>
                </div>

                <div
                    className="table-body-container"
                    style={{ height: height - 24, overflow: 'clip scroll', width: totalWidth }} // 修改 overflow 属性
                    onScroll={handleScroll}
                >
                    <div style={{ height: totalHeight, width: totalWidth, overflow: 'hidden' }}>
                        <table className="table-body" style={{ paddingTop: startIndex * rowHeight || 0 }}>
                            <tbody>
                                {visibleData.map((row, index) => (
                                    <tr key={index} style={{ height: rowHeight }}>
                                        {adjustedColumns.map((column, index) => (
                                            <td key={index} style={{ width: column.width, minWidth: column.width }}>
                                                <div style={{
                                                    width: column.width,
                                                    textAlign: column.textAlign || 'left',
                                                }}>
                                                    {row[column.dataIndex as keyof RowData]}
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
        </div>
    );
};

export default VirtualTable;
