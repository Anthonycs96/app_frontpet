"use client"

import { useState, useEffect } from "react"

export const useDeviceInfo = () => {
    const [deviceInfo, setDeviceInfo] = useState({
        browserName: "",
        deviceType: "",
        lastActive: new Date().toLocaleTimeString(),
    })

    useEffect(() => {
        const getBrowserName = () => {
            const userAgent = navigator.userAgent
            if (userAgent.indexOf("Chrome") > -1) return "Chrome"
            else if (userAgent.indexOf("Safari") > -1) return "Safari"
            else if (userAgent.indexOf("Firefox") > -1) return "Firefox"
            else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident/") > -1) return "Internet Explorer"
            else return "Unknown"
        }

        const getDeviceType = () => {
            if (typeof window !== "undefined") {
                if (window.innerWidth <= 768) {
                    return "Mobile"
                } else if (window.innerWidth <= 1024) {
                    return "Tablet"
                } else {
                    return "Desktop"
                }
            }
            return "Unknown"
        }

        setDeviceInfo({
            browserName: getBrowserName(),
            deviceType: getDeviceType(),
            lastActive: new Date().toLocaleTimeString(),
        })
    }, [])

    return deviceInfo
}
