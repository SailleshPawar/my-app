import ReactTable from "react-table/lib";
import PropTypes from "prop-types";
import * as React from "react";
import 'react-table/react-table.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const TableComponent = props => {
  const { data, columns, defaultPageSize,noRecordsText } = props;
  if (data.length > 0) {
    return (
   

      <div className='row-utilities' style={{ display: "block" }}>
        <ReactTable
          data={data}
          columns={columns}
          minRows = {0}
          defaultPageSize={defaultPageSize}
        />
      </div>
    );
  } else {
    return (
      <div className=" text-center">
        <h4>{noRecordsText}</h4>
      </div>
    );
  }
};

TableComponent.defaultProps = {
  defaultPageSize: 5,
  noRecordsText:'No Records found'
}
TableComponent.propTypes = {
  defaultPageSize: PropTypes.number,
  noRecordsText:PropTypes.string
};
export default TableComponent;
