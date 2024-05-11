import withAdminAuth from "../withAdminAuth";

function AdminDash() {
    return (
        <div>
            <h1>AdminAdd</h1>
        </div>
    );
}

export default withAdminAuth(AdminDash);