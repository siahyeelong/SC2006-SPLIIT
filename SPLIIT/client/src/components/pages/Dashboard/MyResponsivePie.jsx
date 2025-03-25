// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from "@nivo/pie";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const MyResponsivePie = ({ data /* see data tab */ }) => (
    <ResponsivePie
        data={data}
        margin={{ top: 4, right: 80, bottom: 80, left: 80 }}
        sortByValue={true}
        innerRadius={0.7}
        padAngle={2}
        cornerRadius={10}
        activeOuterRadiusOffset={10}
        borderWidth={3}
        borderColor={{
            from: "color",
            modifiers: [["darker", 0.3]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="black"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
        }}
        defs={[
            {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                size: 4,
                padding: 1,
                stagger: true,
            },
            {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
            },
        ]}
        fill={[
            {
                match: {
                    id: "ruby",
                },
                id: "dots",
            },
            {
                match: {
                    id: "c",
                },
                id: "dots",
            },
            {
                match: {
                    id: "go",
                },
                id: "dots",
            },
            {
                match: {
                    id: "python",
                },
                id: "dots",
            },
            {
                match: {
                    id: "scala",
                },
                id: "lines",
            },
            {
                match: {
                    id: "lisp",
                },
                id: "lines",
            },
            {
                match: {
                    id: "elixir",
                },
                id: "lines",
            },
            {
                match: {
                    id: "javascript",
                },
                id: "lines",
            },
        ]}
        tooltip={({ datum }) => (
            <div
                style={{
                    background: "rgba(0, 0, 0, 0.8)",
                    color: "#fff",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                    transition: "transform 0.2s ease-in-out",
                }}
            >
                <span
                    style={{
                        display: "inline-block",
                        width: "12px",
                        height: "12px",
                        backgroundColor: datum.color,
                        borderRadius: "50%",
                    }}
                ></span>
                {datum.label}: {datum.value}
            </div>
        )}
        legends={[
            {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "black",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                    {
                        on: "hover",
                        style: {
                            itemTextColor: "grey",
                        },
                    },
                ],
            },
        ]}
    />
);

export const test_data = [
    {
        id: "food",
        label: "food",
        value: 506,
        color: "hsl(309, 70%, 50%)",
    },
    {
        id: "transport",
        label: "transport",
        value: 253,
        color: "hsl(38, 70%, 50%)",
    },
    {
        id: "accomodation",
        label: "accomodation",
        value: 543,
        color: "hsl(358, 70%, 50%)",
    },
    {
        id: "entertainment",
        label: "entertainment",
        value: 278,
        color: "hsl(236, 70%, 50%)",
    },
    {
        id: "shopping",
        label: "shopping",
        value: 38,
        color: "hsl(133, 70%, 50%)",
    },
];
