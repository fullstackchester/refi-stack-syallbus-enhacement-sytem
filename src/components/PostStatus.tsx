import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faExclamationCircle, faEye } from '@fortawesome/free-solid-svg-icons'
import { SyllabusStatus } from 'enums/general.enums'
import type React from 'react';

interface PostStatusProps {
    postStatus: string
    textSize?: 'text-xs'
}

const APPROVED_ICON = <FontAwesomeIcon icon={faCheckCircle} className={`ml-1`} />
const NEEDS_REVISION_ICON = <FontAwesomeIcon icon={faExclamationCircle} className={`ml-1`} />
const NEEDS_REVIEWING_ICON = <FontAwesomeIcon icon={faEye} className={`ml-1`} />

export default function PostStatus(
    { postStatus, textSize = 'text-xs'
    }: PostStatusProps
) {

    const defineStatusChipColor = (): string => {
        if (postStatus === SyllabusStatus.APPROVED) {
            return 'bg-green-600'
        }

        else if (postStatus === SyllabusStatus.NEEDS_REVISIONS) {
            return 'bg-red-600'
        }

        else if (postStatus === SyllabusStatus.NEEDS_REVIEWING) {
            return 'bg-sky-600'
        }

        else {
            return 'bg-zinc-600'
        }

    }

    const defineStatusChipIcon = (): React.JSX.Element | undefined => {
        if (postStatus === SyllabusStatus.APPROVED) {
            return APPROVED_ICON
        }

        if (postStatus === SyllabusStatus.NEEDS_REVIEWING) {
            return NEEDS_REVIEWING_ICON
        }

        if (postStatus === SyllabusStatus.NEEDS_REVISIONS) {
            return NEEDS_REVISION_ICON
        }
    }

    const STATUS_CHIP_COLOR = defineStatusChipColor()
    const STATUS_CHIP_ICON = defineStatusChipIcon()
    
    return (
        <div className={`${STATUS_CHIP_COLOR} 
            text-white py-1 px-4 rounded-xl flex flex-row items-center justify-center ml-2 min-w-34 w-max h-fit  transition-colors ${textSize} z-0 `}>
            { postStatus }
            {STATUS_CHIP_ICON}
        </div>
    )
}
