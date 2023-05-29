import React, { useState, useEffect, useRef } from 'react';

interface RowData {
    id: number;
    name: string;
    age: number;
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
    data: RowData[];
    rowHeight?: number;
    height?: number;
    rowClassName?: (rowData: RowData, index?: number) => string;
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

const VirtualTable: React.FC<TableProps> = (props) => {
    const {
        columns,
        data,
        rowHeight = 24,
        height = 300,
        rowClassName
    } = props;

    // ---------------------------------------------------------

    const diffCount = 2;
    const visibleRows = ((height - 24) + (diffCount * 2 * 24)) / 24;
    
    const tableRef = useRef<HTMLDivElement>(null);
    const [startIndex, setStartIndex] = useState<number>(0);
    const [visibleData, setVisibleData] = useState<typeof data | []>([]);
    const [totalHeight, setTotalHeight] = useState<number>(0);
    const [totalWidth, setTotalWidth] = useState<number>(0);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [adjustedColumns, setAdjustedColumns] = useState<Column[]>(columns);

    // ---------------------------------------------------------

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop } = (event as React.UIEvent<HTMLDivElement>)?.currentTarget;
        const diff = scrollTop - rowHeight * diffCount;
        const index = diff > 0 ? Math.floor(diff / rowHeight) : 0;

        setStartIndex(index);
        setVisibleData(data.slice(index, index + visibleRows));
    };

    // init ---------------------------------------------------

    const initData = () => {
        setVisibleData(data.slice(0, visibleRows));
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
        setTotalHeight(Math.ceil(data.length * rowHeight))
    }, [data, rowHeight])

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
                                    <tr key={row.id} style={{ height: rowHeight }} className={rowClassName ? rowClassName(row, index) : ''}>
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
