import withAdminAuth from '../withAdminAuth.jsx';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Container, Row, Col, Button, Card, Form, Alert } from 'react-bootstrap';
import {
    DELETE_ALERT,
    DELETE_NOTIFICATION,
    DELETE_CONTENT
} from '../../../utils/mutations.js';
import {
    GET_ALL_USER_ALERTS,
    GET_ALL_NOTIFICATIONS,
    GET_ALL_CONTENT
} from '../../../utils/queries.js';

import CreateAlertForm from './alerts/createAlert.jsx';
import UpdateAlertForm from './alerts/updateAlert.jsx';
import CreateNotificationForm from './notifications/CreateNotifications.jsx';
import UpdateNotificationForm from './notifications/UpdateNotifications.jsx';
import CreateContentForm from './content/createContent.jsx';
import UpdateContentForm from './content/updateContent.jsx';

function AdminAlertsNotifications() {
    const [selectedDetail, setSelectedDetail] = useState('alerts');
    const [details, setDetails] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const { data: alertsData } = useQuery(GET_ALL_USER_ALERTS);
    const { data: notificationsData } = useQuery(GET_ALL_NOTIFICATIONS);
    const { data: contentData } = useQuery(GET_ALL_CONTENT);

    const [deleteAlert] = useMutation(DELETE_ALERT);
    const [deleteNotification] = useMutation(DELETE_NOTIFICATION);
    const [deleteContent] = useMutation(DELETE_CONTENT);

    useEffect(() => {
        switch (selectedDetail) {
            case 'alerts':
                setDetails(alertsData?.alerts || []);
                break;
            case 'notifications':
                setDetails(notificationsData?.notifications || []);
                break;
            case 'content':
                setDetails(contentData?.content || []);
                break;
            default:
                setDetails([]);
        }
    }, [selectedDetail, alertsData, notificationsData, contentData]);

    const handleSelectItem = (item) => {
        setSelectedItem(item);
    }

    const handleDelete = async (id) => {
        try {
            switch (selectedDetail) {
                case 'alerts':
                    await deleteAlert({
                        variables: { id }
                    });
                    break;
                case 'notifications':
                    await deleteNotification({
                        variables: { id }
                    });
                    break;
                case 'content':
                    await deleteContent({
                        variables: { id }
                    });
                    break;
                default:
                    break;
            }
        } catch (err) {
            console.error('Error deleting item:', err);
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h2>Alerts & Notifications</h2>
                    <Button
                        variant="primary"
                        onClick={() => setSelectedItem(null)}
                    >
                        Add New
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => setSelectedDetail('alerts')}
                    >
                        Alerts
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => setSelectedDetail('notifications')}
                    >
                        Notifications
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => setSelectedDetail('content')}
                    >
                        Content
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    {selectedItem ? (
                        <Card>
                            <Card.Body>
                                {selectedDetail === 'alerts' ? (
                                    <UpdateAlertForm alert={selectedItem} />
                                ) : selectedDetail === 'notifications' ? (
                                    <UpdateNotificationForm notification={selectedItem} />
                                ) : (
                                    <UpdateContentForm content={selectedItem} />
                                )}
                            </Card.Body>
                        </Card>
                    ) : (
                        <Card>
                            <Card.Body>
                                <ul>
                                    {details.map((item) => (
                                        <li key={item.id}>
                                            <Button
                                                variant="link"
                                                onClick={() => handleSelectItem(item)}
                                            >
                                                {selectedDetail === 'alerts' ? (
                                                    item.alertText
                                                ) : selectedDetail === 'notifications' ? (
                                                    item.notificationText
                                                ) : (
                                                    item.title
                                                )}
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                Delete
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            {selectedDetail === 'alerts' && <CreateAlertForm />}
                            {selectedDetail === 'notifications' && <CreateNotificationForm />}
                            {selectedDetail === 'content' && <CreateContentForm />}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default withAdminAuth(AdminAlertsNotifications);