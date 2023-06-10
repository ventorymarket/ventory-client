export const getLogoURL = (path:any) => {
    if (!path) return null;
    try {
        if (path.slice(0, 5) == "https") {
            return path;
        } else return path && `${process.env.NEXT_PUBLIC_CMS_URL}${path}`;
    } catch (ex) {
        console.log(ex);
    }
};