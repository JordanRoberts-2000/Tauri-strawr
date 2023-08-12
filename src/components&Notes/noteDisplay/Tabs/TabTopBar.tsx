import { useStore } from "../../../../store"

type Props = {
    tabId: number
}

const TabTopBar = ({tabId}: Props) => {
    const { tabs } = useStore()
    const handleCloseTab = () => {
        const filteredTabs = tabs.filter((els) => {
            return tabId !== els
        })
        useStore.setState(() => ({tabs: filteredTabs}))
    }
    return (
        <div className="flex border-gray-500 border p-1">
            <button className="ml-auto mr-2" onClick={() => handleCloseTab()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    )
}

export default TabTopBar