import withAdminAuth from "../../../pages/Admin/withAdminAuth.jsx";
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';

function AdminOrders() {
    return (
        <div>
            <h1>AdminOrders</h1>
        </div>
    );
}

export default withAdminAuth(AdminOrders);