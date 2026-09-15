export function getVendorId(user) {
  if (!user) {
    return null;
  }

  if (user.id !== undefined && user.id !== null) {
    return `vendor_${user.id}`;
  }

  if (user.email) {
    return `vendor_${user.email
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]/g, "_")}`;
  }

  return null;
}