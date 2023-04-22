import { Ref } from 'vue'

const DeviceType = {
  MOBILE: 'mobile',
  DESKTOP: 'dessktop',
} as const
export type DeviceType = typeof DeviceType[keyof typeof DeviceType]

const DeviceWidth = {
  MOBILE: 959,
  DESKTOP: 960,
} as const
export type DeviceWidth = typeof DeviceWidth[keyof typeof DeviceWidth]

// デバイス幅を検出してデバイス名を返す
function detectDevice(): DeviceType {
  const width = window.innerWidth
  if (width <= DeviceWidth.MOBILE) {
    return DeviceType.MOBILE
  } else {
    return DeviceType.DESKTOP
  }
}

// デバイス名が指定のデバイスタイプと一致するかどうかを返す
function checkDeviceType(device: DeviceType, type: DeviceType): boolean {
  return device === type
}

export const useDevice = () => {
  const device: Ref<DeviceType> = useState('useDevice.device', () => {
    return detectDevice()
  })

  const isDeviceDesktop: Ref<boolean> = useState(
    'useDevice.isDeviceDesktop',
    () => {
      return checkDeviceType(device.value, DeviceType.DESKTOP)
    }
  )

  const isDeviceMobile: Ref<boolean> = useState(
    'useDevice.isDeviceMobile',
    () => {
      return checkDeviceType(device.value, DeviceType.MOBILE)
    }
  )

  // リサイズ検出
  window.addEventListener('resize', () => {
    device.value = detectDevice()
    isDeviceDesktop.value = checkDeviceType(device.value, DeviceType.DESKTOP)
    isDeviceMobile.value = checkDeviceType(device.value, DeviceType.MOBILE)
  })

  return {
    device,
    isDeviceDesktop,
    isDeviceMobile,
  }

}
