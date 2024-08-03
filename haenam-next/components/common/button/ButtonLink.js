"use client";

import ButtonBase from "@/components/common/button/ButtonBase";

import PropTypes from "prop-types";
import { useRouter, usePathname } from "next/navigation";

export default function ButtonLink({ endPoint, isChildren }) {
    const router = useRouter();
    const currentPath = usePathname();
    const path = isChildren ? `${currentPath}/${endPoint}` : `/${endPoint}`;

    function go() {
        router.prefetch(path);
        router.push(path);
    }

    return <ButtonBase action={endPoint} onClick={go} />;
}

ButtonLink.propTypes = {
    endPoint: PropTypes.string.isRequired,
    isChildren: PropTypes.bool,
};

ButtonLink.defaultProps = {
    isChildren: true,
};
