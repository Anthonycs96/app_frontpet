export function useDeviceInfo() {
    const getDeviceInfo = () => {
        const userAgent = navigator.userAgent;
        const platform = navigator.userAgentData?.platform || navigator.platform;

        let deviceType = "Dispositivo desconocido";
        let browserName = "Navegador desconocido";

        // Detectar sistema operativo
        if (/Windows/.test(platform)) deviceType = "Windows";
        else if (/Mac/.test(platform)) deviceType = "MacOS";
        else if (/Linux/.test(platform)) deviceType = "Linux";
        else if (/Android/.test(userAgent)) deviceType = "Android";
        else if (/iPhone|iPad|iPod/.test(userAgent)) deviceType = "iOS";

        // Detectar navegador
        if (userAgent.includes("Chrome")) browserName = "Chrome";
        else if (userAgent.includes("Firefox")) browserName = "Firefox";
        else if (userAgent.includes("Safari")) browserName = "Safari";
        else if (userAgent.includes("Edge")) browserName = "Edge";
        else if (userAgent.includes("Opera")) browserName = "Opera";

        return {
            deviceType,
            browserName,
            lastActive: new Date().toLocaleString()
        };
    };

    return getDeviceInfo();
}