import withAdminAuth from "../withAdminAuth";

function AdminProducts() {
    return (
        <div>
            <h1>AdminProducts</h1>
        </div>
    );
}

export default withAdminAuth(AdminProducts);