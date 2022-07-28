export const ConnectedUsers = ({ users }: any) => (
  <div className="user-list">
    <h4>Connected Users</h4>
    {users.map((u: any, idx: any) => (
      <h6 key={idx}>{u}</h6>
    ))}
  </div>
);
