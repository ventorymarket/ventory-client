import { Table, TableProps } from "antd";
import NoData from "../NoData";
import React from "react";
import cx from "classnames";

const CustomTable = ({
  columns,
  dataSource,
  bordered = false,
  loading,
  scroll,
  className,
  ...props
}: TableProps<any>) => {
  return (
    <Table
      className={cx("custom-table", className)}
      columns={columns}
      dataSource={dataSource}
      bordered={bordered}
      pagination={false}
      loading={loading}
      locale={{
        emptyText: <NoData />,
      }}
      scroll={scroll}
      {...props}
    />
  );
};

export default CustomTable;
