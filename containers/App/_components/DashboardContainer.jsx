import classNames from "classnames";

const DashboardContainer = ({ icon: Icon, title, desc, size, style }) => {
    return (
        <div className={
            classNames(
                "p-4 rounded-lg",
                size === "full" && "h-[10rem] w-[20rem] flex flex-col justify-between",
                size === "small" && "h-[5rem] w-[20rem] flex flex-row items-center gap-4",
                style === "blue" && "bg-container-blue",
                style === "purple" && "bg-mid-purple"
            )
        }>
            <div className={
                classNames(
                    "bg-mid-high-purple w-12 h-12 rounded-lg flex items-center justify-center",

                )
            }>
                <Icon className="fill-white"/>
            </div>

            <div className="flex flex-col">
                <span className={
                    classNames(
                        size === "full" && "font-medium text-sm-heading text-white",
                        size === "small" && "font-semibold text-small text-white"
                    )
                }>
                {title}
            </span>

                <span className={
                    classNames(
                        size === "full" && "text-purple-text font-semibold text-x-small",
                        size === "small" && "text-white font-normal text-xx-small"
                    )
                }>
                {desc}
            </span>
            </div>
        </div>
    )
}
export default DashboardContainer