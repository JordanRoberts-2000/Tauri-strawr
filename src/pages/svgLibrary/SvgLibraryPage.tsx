import SvgLibraryMainSection from "../../components/svgLibrary/mainSection/SvgLibraryMainSection"
import SvgLibraryTopBar from "../../components/svgLibrary/topbar/SvgLibraryTopBar"
import SvgOptionsContextWrapper from "../../utils/providers/svgPage/SvgOptionsContextWrapper"

const SvgLibraryPage = () => {
    return (
        <div className="flex flex-1 flex-col min-h-0 h-full">
            <SvgOptionsContextWrapper>
                <SvgLibraryTopBar />
                <SvgLibraryMainSection />
            </SvgOptionsContextWrapper>
        </div>
    )
}

export default SvgLibraryPage