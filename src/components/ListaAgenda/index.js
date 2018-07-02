import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

import * as SC from './StyledComponents';
import AssocTable from '../AssocTable/AssocTable';
import CustomPaginate from '../CustomPaginate';


export default class ListaAgenda extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      offsetIndex: 0,
    };

    this.paginateRef = React.createRef();

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ page: 0, offsetIndex: 0 });
  }

  handlePageClick(data) {
    const { itemsPerPage } = this.props;
    const { selected } = data;
    const offsetIndex = Math.ceil(selected * itemsPerPage);

    this.setState({
      offsetIndex,
      page: selected,
    }, () => {
      // eslint-disable-next-line react/no-find-dom-node
      const node = ReactDom.findDOMNode(this.paginateRef.current);
      // Check if this works well in different layouts
      window.scrollTo(0, node.offsetTop);
    });
  }


  render() {
    const {
      itemsPerPage,
      items,
      fieldNameMap,
      tableHeaders,
      tableDataField,
      onDeleteContacto,
      onEditContacto,
    } = this.props;
    const { offsetIndex, page } = this.state;
    return (
      <React.Fragment>
        <SC.ListaContainer>

          {items.slice(offsetIndex, offsetIndex + itemsPerPage).map((item, i) => (
            <ListaItem
              key={`listItem${i}`}
              item={item}
              fieldNameMap={fieldNameMap}
              onEditContacto={onEditContacto}
              onDeleteContacto={() => onDeleteContacto(item.id)}
              tableDataField={tableDataField}
              tableHeaders={tableHeaders}
            />
          ))}

          <CustomPaginate
            ref={this.paginateRef}
            pageCount={Math.ceil(items.length / itemsPerPage)}
            onPageChange={this.handlePageClick}
            forcePage={page}
          />
        </SC.ListaContainer>
      </React.Fragment>
    );
  }
}


const ListaItem = function __ListaItem(props) {
  const {
    fieldNameMap, onDeleteContacto, onEditContacto, item, tableDataField, tableHeaders,
  } = props;
  return (
    <SC.ListaItemContainer>
      <SC.Buttonera>
        <SC.Button type="edit" title="Editar" onClick={() => onEditContacto(props.item)} />
        <SC.ButtonDanger
          type="delete"
          title="Borrar"
          onClick={onDeleteContacto}
        />
      </SC.Buttonera>

      {Object.keys(item).filter(k => fieldNameMap[k] && item[k]).map((k, i) => (
        <SC.Field key={`${k}field${i}`}>
          <SC.FieldName>{`${fieldNameMap[k]}:`}</SC.FieldName>
          <SC.FieldValue>{item[k]}</SC.FieldValue>
        </SC.Field>
      ))}

      <AssocTable
        headers={tableHeaders}
        data={item[tableDataField]}
      />

    </SC.ListaItemContainer>
  );
};


ListaAgenda.propTypes = {
  itemsPerPage: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fieldNameMap: PropTypes.shape({}),
  tableHeaders: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    prop: PropTypes.string,
  })),
  tableDataField: PropTypes.string,
  onEditContacto: PropTypes.func,
  onDeleteContacto: PropTypes.func,
};

ListaAgenda.defaultProps = {
  itemsPerPage: 5,
  fieldNameMap: {},
  tableHeaders: [],
  tableDataField: '',
  onEditContacto: () => {},
  onDeleteContacto: () => {},
};


ListaItem.propTypes = {
  item: PropTypes.shape({
    contactos: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  fieldNameMap: PropTypes.shape({}),
  tableHeaders: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    prop: PropTypes.string,
  })),
  tableDataField: PropTypes.string,
  onEditContacto: PropTypes.func,
  onDeleteContacto: PropTypes.func,
};

ListaItem.defaultProps = {
  item: {},
  fieldNameMap: {},
  tableHeaders: [],
  tableDataField: '',
  onEditContacto: () => {},
  onDeleteContacto: () => {},
};
