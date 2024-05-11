import withAdminAuth from "../withAdminAuth";

function AdminOrders() {
    return (
        <div>
            <h1>AdminOrders</h1>
        </div>
    );
}

export default withAdminAuth(AdminOrders);