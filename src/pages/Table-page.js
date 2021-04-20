import React from 'react';
import {BasicTable} from '../components/Table/table';
import dataset from '../utils/fake-data.json';
import './table-page.css'

export const TablePage = () => {

    return (
        <div className="main-area">
            <BasicTable data={dataset} />
        </div>
    );
}