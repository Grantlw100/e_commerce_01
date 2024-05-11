import withAdminAuth from "../withAdminAuth";

function AdminUsers() {
    return (
        <div>
            <h1>AdminUsers</h1>
        </div>
    );
}

export default withAdminAuth(AdminUsers);