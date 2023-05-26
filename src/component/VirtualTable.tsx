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
    const [startIndex, setStartIndex] = useState(0);
    const [visibleData, setVisibleData] = useState<any[]>([]);
    const [containerWidth, setContainerWidth] = useState(0);
    const tableRef = useRef<HTMLDivElement>(null);
    const [adjustedColumns, setAdjustedColumns] = useState<Column[]>(columns);

    const handleScroll = (event: React.UIEvent<HTMLDivElement> | 0) => {
        const { scrollTop } = (event as React.UIEvent<HTMLDivElement>)?.currentTarget || 0;
        const newStartIndex = Math.floor(scrollTop / rowHeight) || 0;

        if (tableRef.current && startIndex + visibleRows <= rows.length) {
            setStartIndex(newStartIndex);
            setVisibleData(rows.slice(newStartIndex, newStartIndex + visibleRows));
        }
    };

    const totalHeight = Math.ceil(600); // 使用 Math.ceil 向上取整
    const [totalWidth, setTotalWidth] = useState(0);

    // 设置 table columns --------------------------------------

    useEffect(() => {
        handleScroll(0);

        const { newColumns, containerWidth, totalWidth } = fitTableColumnsWidth(columns, tableRef); // columns width 相关

        if (containerWidth) {
            setContainerWidth(containerWidth);
            setTotalWidth(totalWidth);
            setAdjustedColumns(newColumns);
        }
    }, [columns])

    return (
        <div className="table-container" style={{ width: '100%', overflowX: 'auto' }} ref={tableRef}>
            <div style={{ width: containerWidth, overflowX: 'scroll' }}>
                <div className="table-header-contaienr">
                    <table className="table-header">
                        <thead>
                            <tr>
                                {adjustedColumns.map((column, index) => (
                                    <th
                                        key={column.dataIndex + index}
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
                    style={{ height: 300, overflow: 'clip scroll', width: totalWidth }} // 修改 overflow 属性
                    onScroll={handleScroll}
                >
                    <div style={{ height: totalHeight, width: totalWidth, overflow: 'hidden' }}>
                        <table className="table-body" style={{ paddingTop: startIndex * rowHeight || 0 }}>
                            <tbody>
                                {visibleData.map((row, index) => (
                                    <tr key={row.id + index} style={{ height: rowHeight }}>
                                        {adjustedColumns.map((column, index) => (
                                            <td key={column.dataIndex + index} style={{ width: column.width, minWidth: column.width }}>
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
        </div>
    );
};

export default VirtualTable;
