import withAdminAuth from "../withAdminAuth";

function AdminCategories() {
    return (
        <div>
            <h1>AdminCats</h1>
        </div>
    );
}

export default withAdminAuth(AdminCategories);