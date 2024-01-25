export const maskedFullName = (name) => {
    const initials = name.split(' ').map(word => word[0]);
    return <div>{initials.join('') + '*'.repeat(name.length - initials.length)}</div>;
}
