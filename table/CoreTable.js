import * as React from "react";
import './_CoreTable.less';

export default class CoreTable extends React.Component {


    toCamelCase(str) {
        if (!str) {
            return str;
        }

        const words = str.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1));
        words[0] = words[0].toLowerCase();
        return words.join("");
    }

    getNamespace()  {
        return this.toCamelCase(this.props.namespace || this.context.namespace);
    }

    classes(...args) {
        const raw = args.filter(item => item);
        const prefix = this.getNamespace();
        const namespaced = prefix ? raw
            .filter(item => item.match(isComponent))
            .map(item => `${prefix}-${item}`) : [];
        return raw.concat(namespaced).join(" ");
    }


    renderTableHead() {
        const columns = [];

        for (let j in this.props.cols) {
            if (!this.props.cols.hasOwnProperty(j)) {
                continue;
            }

            columns.push(<th>{this.props.cols[j].label}</th>);
        }

        return <thead>
        <tr>{columns}</tr>
        </thead>;
    }

    renderTableBody() {
        const rows = [];
        for (const i in this.props.data) {
            if (!this.props.data.hasOwnProperty(i)) {
                continue;
            }

            const row = this.props.data[i];
            const columns = [];
            for (let columnIndex in this.props.cols) {
                if (!this.props.cols.hasOwnProperty(columnIndex)) {
                    continue;
                }

                const columnRenderFunction = this.props.cols[columnIndex].renderer;
                const columnKey = this.props.cols[columnIndex].key;
                const cellValue = row[columnKey];

                if (columnRenderFunction != null) {
                    columns.push(<td>{columnRenderFunction(cellValue, i)}</td>);
                } else {
                    columns.push(<td>{cellValue}</td>);
                }

            }

            rows.push(<tr>{columns}</tr>);
        }

        return <tbody>{rows}</tbody>;
    }

    render() {
        return <table className={this.classes("Table", this.props.className)}>
            {this.renderTableHead()}
            {this.renderTableBody()}
        </table>;
    }
}
