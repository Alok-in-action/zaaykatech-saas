'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { MenuItem as MenuItemType, MenuSection } from './types';

const MenuItemCard = ({ item }: { item: MenuItemType }) => {
    if (item.isSignature) {
        return (
            <div className={`${item._isSquareMobile ? 'col-span-1 flex-col md:flex-row md:items-center' : 'col-span-2 flex-row items-center'} md:col-span-2 group signature-card p-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex justify-between text-white border border-[#834e2f]/30`}>
                <div className={`text-left flex-1 ${item._isSquareMobile ? 'mb-3 md:mb-0' : 'mr-2 md:mr-0'}`}>
                    <h4 className="font-sans text-sm font-medium text-white leading-snug break-words">{item.name}</h4>
                    {item.description && <p className="text-[10px] text-white/80 mt-1">{item.description}</p>}
                </div>
                <div className="flex justify-end md:items-center"><span className="text-sm font-bold bg-white/25 text-white px-3 py-1 rounded-full whitespace-nowrap">{item.price}</span></div>
            </div>
        )
    }

    return (
        <div className={`group bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-[#8B4A27]/5 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${item._isForcedRectangular ? 'col-span-2 md:col-span-1' : ''}`}>
            {(item.isMostOrdered || item.customTag) && <span className="inline-block mb-2 text-[9px] font-bold uppercase tracking-wider text-[#8B4A27] bg-[#8B4A27]/10 px-2 py-0.5 rounded">{item.customTag || "Bestseller"}</span>}
            <h4 className="font-sans text-sm font-medium text-[#4a3b32] break-words leading-snug mb-2">
                {item.name}
            </h4>
            {item.description && <p className="font-sans text-[10px] text-gray-400 leading-relaxed mb-2">{item.description}</p>}
            {item.price && <div className="flex justify-end"><span className="text-xs font-semibold text-[#8B4A27] bg-[#8B4A27]/10 px-2 py-0.5 rounded-full">{item.price}</span></div>}
        </div>
    );
};

const CraftMenuItemCard = ({ item }: { item: MenuItemType }) => {
    return (
        <div className={`group bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-[#8B4A27]/5 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${item._isForcedRectangular ? 'col-span-2 md:col-span-1' : ''}`}>
            {(item.isMostOrdered || item.customTag) && <span className="inline-block mb-2 text-[9px] font-bold uppercase tracking-wider text-[#8B4A27] bg-[#8B4A27]/10 px-2 py-0.5 rounded">{item.customTag || "Bestseller"}</span>}
            <h4 className="font-sans text-sm font-medium break-words leading-snug mb-2">{item.name}</h4>
            <div className="flex justify-end">
                <span className="text-xs font-semibold text-[#8B4A27] bg-[#8B4A27]/10 px-2 py-0.5 rounded-full">{item.price}</span>
            </div>
        </div>
    );
}

const SpecialBlueDreamCard = ({ item }: { item: MenuItemType }) => (
    <div className={`group bg-[#F0F8FF] p-4 rounded-xl shadow-sm border border-[#B0E0E6]/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${item._isForcedRectangular ? 'col-span-2 md:col-span-1' : ''}`}>
        {(item.isMostOrdered || item.customTag) && <span className="inline-block mb-2 text-[9px] font-bold uppercase tracking-wider text-[#2e4c5a] bg-white px-2 py-0.5 rounded">{item.customTag || "Bestseller"}</span>}
        <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0 mr-2">
                <h4 className="font-sans text-sm font-medium text-[#2e4c5a] break-words">{item.name}</h4>
                {item.description && <p className="text-[10px] text-[#2e4c5a]/60 mt-1 leading-relaxed">{item.description}</p>}
            </div>
            <span className="text-xs font-semibold text-[#2e4c5a] bg-white px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">{item.price}</span>
        </div>
    </div>
);

const WhispersOfLoveCard = ({ item }: { item: MenuItemType }) => (
    <div className="group bg-gradient-to-br from-[#8B4A4A] via-[#7A3B3B] to-[#6B3030] p-4 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-rose-200/30">
        <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <iconify-icon icon="solar:heart-bold" className="text-rose-200/90 text-base flex-shrink-0"></iconify-icon>
                    <h4 className="font-sans text-sm font-semibold text-[#f2e6d9] break-words">{item.name}</h4>
                </div>
                {item.description && <p className="text-[10px] text-[#f2e6d9]/70 mt-2 leading-relaxed">{item.description}</p>}
                {(item.isMostOrdered || item.customTag) && (
                    <span className="inline-block mt-2 text-[10px] font-bold text-[#f2e6d9] bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full uppercase">{item.customTag || "BESTSELLER"}</span>
                )}
            </div>
            <span className="text-xs font-bold text-[#f2e6d9] bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full ml-3 whitespace-nowrap flex-shrink-0">{item.price}</span>
        </div>
    </div>
);



const SummerEditCard = ({ item }: { item: MenuItemType }) => (
    <div className="group bg-gradient-to-br from-[#FFF3E0] via-[#FFF8E7] to-[#FFFDE7] p-3 sm:p-4 rounded-2xl shadow-sm border border-[#FFB300]/20 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col">
        {item.customTag && (
            <span className={`inline-block mb-1.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded self-start ${item.customTag.toLowerCase() === 'trending' ? 'text-[#BF360C] bg-[#FF3D00]/10' : 'text-[#E65100] bg-[#FFB300]/20'}`}>
                {item.customTag}
            </span>
        )}
        <h4 className="font-sans text-sm font-medium text-[#5D4037] break-words leading-snug mb-2 flex-1">{item.name}</h4>
        <div className="flex justify-end mt-1">
            <span className="text-xs font-bold text-[#E65100] bg-[#FFB300]/15 px-2 py-0.5 rounded-full">₹{item.price}</span>
        </div>
    </div>
);

const MatchaCard = ({ item }: { item: MenuItemType }) => (
    <div className="group bg-gradient-to-br from-[#F0F7F0] via-[#F5FAF5] to-[#FAFFF5] p-3 sm:p-4 rounded-xl shadow-sm border border-[#8FBC8F]/10 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
        {(item.isMostOrdered || item.customTag) && <span className="inline-block mb-2 text-[9px] font-bold uppercase tracking-wider text-[#4A7C59] bg-[#8FBC8F]/10 px-2 py-0.5 rounded">{item.customTag || "Bestseller"}</span>}
        <div className="flex justify-between items-start gap-2 mb-2">
            <h4 className="font-sans text-sm font-medium text-[#3A5A3A] min-w-0 break-words flex-1">
                {item.name}
            </h4>
            {item.price && <span className="text-xs font-semibold text-[#4A7C59] bg-[#8FBC8F]/10 px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">{item.price}</span>}
        </div>
        {item.description && <p className="font-sans text-[10px] text-gray-400 leading-relaxed">{item.description}</p>}
    </div>
);


const ColdFrappeItemCard = ({ item }: { item: MenuItemType }) => {
    if (item.isSignature) {
        return (
            <div className={`${item._isSquareMobile ? 'col-span-1 flex-col md:flex-row md:items-center' : 'col-span-2 flex-row items-center'} md:col-span-2 group signature-card p-4 sm:p-5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex justify-between text-white border border-[#834e2f]/30`}>
                <div className={`text-left flex-1 ${item._isSquareMobile ? 'mb-3 md:mb-0' : 'mr-2 md:mr-0'}`}>
                    <h4 className="font-sans text-sm font-medium text-white leading-snug break-words">{item.name}</h4>
                    {item.description && <p className="text-[10px] text-white/80 mt-1 leading-relaxed">{item.description}</p>}
                </div>
                <div className="flex justify-end md:items-center"><span className="text-sm font-bold bg-white/25 text-white px-3 py-1 rounded-full whitespace-nowrap">{item.price}</span></div>
            </div>
        )
    }

    const category = (item.name.toLowerCase().includes('brew') || item.name.toLowerCase().includes('tonic')) ? 'Brew' : 'Frappe';

    return (
        <div className={`group bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-[#8B4A27]/5 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${item._isForcedRectangular ? 'col-span-2 md:col-span-1' : ''}`}>
            {(item.isMostOrdered || item.customTag) && <span className="inline-block mb-2 text-[9px] font-bold uppercase tracking-wider text-[#8B4A27] bg-[#8B4A27]/10 px-2 py-0.5 rounded">{item.customTag || "Bestseller"}</span>}
            <h4 className="font-sans text-sm font-medium mb-1 min-w-0 break-words">{item.name}</h4>
            <div className="flex justify-between mt-3 text-xs text-[#8B4A27] font-semibold">
                <span>{category}</span>
                <span className="bg-[#8B4A27]/10 px-2 py-0.5 rounded-full">{item.price}</span>
            </div>
        </div>
    )
}

const PizzaItemCard = ({ item }: { item: MenuItemType }) => {
    if (item.isSignature) {
        return (
            <div className="group signature-card p-4 sm:p-5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-white border border-[#834e2f]/30">
                <div className="flex justify-between items-start mb-2 gap-2">
                    <h4 className="font-sans text-sm font-medium text-white leading-snug break-words flex-1 min-w-0">{item.name}</h4>
                </div>
                {item.description && <p className="text-[10px] text-white/80 mb-4 leading-relaxed">{item.description}</p>}
                {item.prices ? (
                    <div className="flex gap-2">
                        <span className="flex-1 text-center text-[10px] border border-white/30 rounded py-1 text-white">NEW YORK: {item.prices.ny}</span>
                        <span className="flex-1 text-center text-[10px] bg-white/25 rounded py-1 text-white font-bold">NEAPOLITAN: {item.prices.neap}</span>
                    </div>
                ) : (
                    item.price && (
                        <div className="flex justify-end">
                            <div className="flex justify-end md:items-center"><span className="text-sm font-bold bg-white/25 text-white px-3 py-1 rounded-full whitespace-nowrap">{item.price}</span></div>
                        </div>
                    )
                )}
            </div>
        )
    }

    let icon = 'solar:pizza-linear';
    if (item.name.toLowerCase().includes('farmville')) icon = 'solar:leaf-linear';
    if (item.name.toLowerCase().includes('four cheese')) icon = 'solar:ruler-pen-linear';

    return (
        <div className="group bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-[#8B4A27]/10 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            {(item.isMostOrdered || item.customTag) && <span className="inline-block mb-2 text-[9px] font-bold uppercase tracking-wider text-[#8B4A27] bg-[#8B4A27]/10 px-2 py-0.5 rounded">{item.customTag || "Bestseller"}</span>}
            <div className="flex justify-between items-start mb-2 gap-2">
                <h4 className="font-sans text-sm sm:text-base font-medium text-[#5A2E1B] min-w-0 break-words flex-1">{item.name}</h4>
                <iconify-icon icon={icon} className="text-[#8B4A27]/40 flex-shrink-0"></iconify-icon>
            </div>
            {item.description && <p className="text-[10px] text-gray-400 mb-4 leading-relaxed">{item.description}</p>}
            {item.prices ? (
                <div className="flex gap-2">
                    <span className="flex-1 text-center text-[10px] border border-[#8B4A27]/20 rounded py-1 text-[#8B4A27]">NEW YORK: {item.prices.ny}</span>
                    <span className="flex-1 text-center text-[10px] bg-[#8B4A27]/10 rounded py-1 text-[#8B4A27] font-medium">NEAPOLITAN: {item.prices.neap}</span>
                </div>
            ) : (
                item.price && (
                    <div className="flex justify-end">
                        <span className="text-xs font-semibold text-[#8B4A27] bg-[#8B4A27]/10 px-2 py-0.5 rounded-full">{item.price}</span>
                    </div>
                )
            )}
        </div>
    )
};

const BitesItemCard = ({ item }: { item: MenuItemType }) => {
    if (item.isSignature) {
        return (
            <div className={`${item._isSquareMobile ? 'col-span-1 flex-col md:flex-row md:items-center' : 'col-span-2 flex-row items-center'} md:col-span-2 group signature-card p-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex justify-between text-white border border-[#834e2f]/30`}>
                <div className={`text-left flex-1 ${item._isSquareMobile ? 'mb-3 md:mb-0' : 'mr-2 md:mr-0'}`}>
                    <h4 className="font-sans text-sm font-medium text-white leading-snug break-words">{item.name}</h4>
                    {item.description && <p className="text-[10px] text-white/80 mt-1 leading-relaxed">{item.description}</p>}
                </div>
                <div className="flex justify-end md:items-center"><span className="text-sm font-bold bg-white/25 text-white px-3 py-1 rounded-full whitespace-nowrap">{item.price}</span></div>
            </div>
        )
    }

    return (
        <div className={`group bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-[#8B4A27]/5 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${item._isForcedRectangular ? 'col-span-2 md:col-span-1' : ''}`}>
            {(item.isMostOrdered || item.customTag) && <span className="inline-block mb-2 text-[9px] font-bold uppercase tracking-wider text-[#8B4A27] bg-[#8B4A27]/10 px-2 py-0.5 rounded">{item.customTag || "Bestseller"}</span>}
            <h4 className="font-sans text-sm font-medium text-[#4a3b32] break-words leading-snug mb-2">
                {item.name}
            </h4>
            {item.description && <p className="font-sans text-[10px] text-gray-400 leading-relaxed mb-2">{item.description}</p>}
            {item.price && <div className="flex justify-end"><span className="text-xs font-semibold text-[#8B4A27] bg-[#8B4A27]/10 px-2 py-0.5 rounded-full">{item.price}</span></div>}
        </div>
    );
};

const ShakeItemCard = ({ item }: { item: MenuItemType }) => {
    if (item.isSignature) {
        return (
            <div className={`${item._isSquareMobile ? 'col-span-1 flex-col md:flex-row md:items-center' : 'col-span-2 flex-row items-center'} md:col-span-3 group signature-card p-3 sm:p-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex justify-between text-white border border-[#834e2f]/30`}>
                <div className={`text-left flex-1 ${item._isSquareMobile ? 'mb-3 md:mb-0' : 'mr-2 md:mr-0'}`}>
                    <h4 className="font-sans text-sm font-medium text-white leading-snug break-words">{item.name}</h4>
                    {item.description && <p className="text-[10px] text-white/80 mt-1 leading-relaxed">{item.description}</p>}
                </div>
                <div className="flex justify-end md:items-center"><span className="text-sm font-bold bg-white/25 text-white px-3 py-1 rounded-full whitespace-nowrap">{item.price}</span></div>
            </div>
        )
    }

    return (
        <div className="group bg-[#fff8f0] p-3 sm:p-4 rounded-xl border border-[#8B4A27]/5 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
                {(item.isMostOrdered || item.customTag) && <span className="inline-block mb-2 text-[9px] font-bold uppercase tracking-wider text-[#8B4A27] bg-[#8B4A27]/10 px-2 py-0.5 rounded">{item.customTag || "Bestseller"}</span>}
                <h4 className="font-sans text-sm font-medium min-w-0 break-words">{item.name}</h4>
                {item.description ?
                    <p className="text-[9px] text-[#8B4A27]/50 mt-1 leading-relaxed">{item.description}</p>
                    : <span className="w-8 h-0.5 bg-[#8B4A27]/10 block my-2"></span>
                }
            </div>
            {item.price && <span className="self-end text-xs font-semibold text-[#8B4A27] bg-[#8B4A27]/10 px-2 py-0.5 rounded-full mt-2">{item.price}</span>}
        </div>
    )
};

const DessertItemCard = ({ item }: { item: MenuItemType }) => {
    let icon = 'solar:donut-bitten-linear';
    if (item.name.toLowerCase().includes('tiramisu')) icon = 'solar:chef-hat-heart-linear';

    if (item.isSignature) {
        return (
            <div className={`${item._isSquareMobile ? 'col-span-1 flex-col md:flex-row md:items-center' : 'col-span-2 flex-row items-center'} md:col-span-2 group signature-card p-3 sm:p-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex justify-between text-white border border-[#834e2f]/30`}>
                <div className={`text-left flex-1 ${item._isSquareMobile ? 'mb-3 md:mb-0' : 'mr-2 md:mr-0'}`}>
                    <h4 className="font-sans text-sm font-medium text-white leading-snug break-words">{item.name}</h4>
                    {item.description && <p className="text-[10px] text-white/80 leading-relaxed">{item.description}</p>}
                </div>
                <div className="flex justify-end md:items-center"><span className="text-sm font-bold bg-white/25 text-white px-3 py-1 rounded-full whitespace-nowrap">{item.price}</span></div>
            </div>
        )
    }

    return (
        <div className={`group bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-[#8B4A27]/5 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center ${item._isForcedRectangular ? 'col-span-2 md:col-span-1' : ''}`}>
            <iconify-icon icon={icon} className="text-2xl text-[#8B4A27]/60 mb-2"></iconify-icon>
            {(item.isMostOrdered || item.customTag) && <span className="inline-block mb-2 text-[9px] font-bold uppercase tracking-wider text-[#8B4A27] bg-[#8B4A27]/10 px-2 py-0.5 rounded">{item.customTag || "Bestseller"}</span>}
            <h4 className="font-sans text-sm font-medium mb-1 min-w-0 break-words">{item.name}</h4>
            {item.price && <div className="flex justify-center mt-2"><span className="text-xs font-semibold text-[#8B4A27] bg-[#8B4A27]/10 px-2 py-0.5 rounded-full">{item.price}</span></div>}
        </div>
    )
};


function getSectionConfig(sectionId: string) {
    let CardComponent: any = MenuItemCard;
    let gridCols = 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

    switch (sectionId) {
        case 'pizza':
            CardComponent = PizzaItemCard;
            gridCols = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
            break;
        case 'summer-edit':
            CardComponent = SummerEditCard;
            break;
        case 'whispers-of-love':
            CardComponent = WhispersOfLoveCard;
            gridCols = 'grid-cols-1 md:grid-cols-2';
            break;
        case 'classic-espresso-bar':
            CardComponent = MenuItemCard;
            break;
        case 'craft-coffees':
            CardComponent = CraftMenuItemCard;
            break;
        case 'cold-brews':
        case 'frappe-to-go':
            CardComponent = ColdFrappeItemCard;
            break;
        case 'bites-for-sides':
        case 'healthy-salads':
        case 'fries-corner':
        case 'pasta':
        case 'sandwiches':
        case 'burgers':
            CardComponent = BitesItemCard;
            break;
        case 'shakes':
            CardComponent = ShakeItemCard;
            gridCols = 'grid-cols-2 md:grid-cols-3';
            break;
        case 'dessert':
            CardComponent = DessertItemCard;
            break;
        case 'blue-dream':
            CardComponent = SpecialBlueDreamCard;
            gridCols = 'grid-cols-1 md:grid-cols-2';
            break;
        case 'matcha':
            CardComponent = MatchaCard;
            break;
        default:
            CardComponent = MenuItemCard;
            break;
    }

    return { CardComponent, gridCols };
}

const SectionComponent = ({ section: originalSection }: { section: MenuSection }) => {
    let currentCell = 0;
    const itemsCount = originalSection.items.length;
    const processedItems = originalSection.items.map((item, index) => {
        let isSquare = false;
        let isForcedRectangular = false;
        const isLastItem = index === itemsCount - 1;

        if (item.isSignature) {
            if (currentCell % 2 === 1) {
                isSquare = true;
                currentCell += 1;
            } else {
                currentCell += 2;
            }
        } else {
            if (isLastItem && currentCell % 2 === 0) {
                isForcedRectangular = true;
                currentCell += 2;
            } else {
                currentCell += 1;
            }
        }
        return { ...item, _isSquareMobile: isSquare, _isForcedRectangular: isForcedRectangular };
    });
    const section = { ...originalSection, items: processedItems };
    let CardComponent;
    let gridCols = 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

    if (section.id === 'summer-edit') {
        return (
            <section id={section.id} className="reveal -mx-4 sm:-mx-6 px-4 sm:px-6 py-10 rounded-2xl shadow-md" style={{ background: 'linear-gradient(135deg, #FFF8E1 0%, #FFE0B2 40%, #FFF9C4 100%)', border: '1.5px solid #FFB30040' }}>
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 bg-[#FF8F00]/10 border border-[#FF8F00]/30 rounded-full px-4 py-1.5 mb-4">
                            <iconify-icon icon="emojione:sun" width="16"></iconify-icon>
                            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#E65100]">Limited Season Special</span>
                            <iconify-icon icon="emojione:sun" width="16"></iconify-icon>
                        </div>
                        <h3 className="font-script text-4xl sm:text-5xl text-[#BF360C] mb-2">{section.title}</h3>
                        {section.subtitle && <p className="font-sans text-xs text-[#6D4C41]/80 italic max-w-sm mx-auto leading-relaxed">{section.subtitle}</p>}
                    </div>
                    {/* Drinks */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <iconify-icon icon="solar:cup-hot-bold" className="text-[#F57F17]" width="16"></iconify-icon>
                            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#F57F17]">Sips</span>
                            <span className="h-px flex-1 bg-[#FFB300]/30"></span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {section.items.slice(0, 8).map(item => <SummerEditCard key={item.name} item={item} />)}
                        </div>
                    </div>
                    {/* Desserts */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <iconify-icon icon="solar:ice-cream-linear" className="text-[#F57F17]" width="16"></iconify-icon>
                            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#F57F17]">Sweet Escapes</span>
                            <span className="h-px flex-1 bg-[#FFB300]/30"></span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {section.items.slice(8).map(item => <SummerEditCard key={item.name} item={item} />)}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (section.id === 'pizza') {
        return (
            <section id={section.id} className="reveal -mx-4 sm:-mx-6 px-4 sm:px-6 py-8 bg-gradient-to-br from-[#f5e6d3] via-[#f2e6d9] to-[#ede0d0] rounded-2xl border border-[#8B4A27]/10 shadow-sm">
                <div className="max-w-7xl mx-auto">
                    {section.preheader && (
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <iconify-icon icon="game-icons:wood-pile" className="text-[#8B4A27] text-lg opacity-70"></iconify-icon>
                            <p className="font-sans text-sm font-medium uppercase tracking-widest text-[#5A2E1B]">{section.preheader}</p>
                            <iconify-icon icon="game-icons:wood-pile" className="text-[#8B4A27] text-lg opacity-70"></iconify-icon>
                        </div>
                    )}
                    <div className="flex items-end gap-3 mb-6 px-1">
                        <iconify-icon icon="mdi:fire" className="text-[#D2691E] text-3xl mb-1 opacity-80"></iconify-icon>
                        <h3 className="font-script text-3xl text-[#5A2E1B]">{section.title}</h3>
                        <span className="h-px flex-1 bg-[#8B4A27]/20 mb-2"></span>
                        <iconify-icon icon="mdi:fire" className="text-[#D2691E] text-3xl mb-1 opacity-80"></iconify-icon>
                    </div>

                    <div className="text-center -mt-4 mb-8 max-w-2xl mx-auto bg-white/50 p-6 rounded-xl border border-[#8B4A27]/10">
                        <p className="font-sans text-sm font-medium uppercase tracking-widest text-[#5A2E1B] mb-4">Choice of Base</p>
                        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-xs text-[#6B3A20]/80">
                            <div>
                                <h4 className="font-sans font-semibold text-sm text-[#5A2E1B] mb-1">NEW YORK STYLE</h4>
                                <p>A thin, hand-tossed crust, soft in the center, crisp at the edge, and perfectly foldable.</p>
                            </div>
                            <div>
                                <h4 className="font-sans font-semibold text-sm text-[#5A2E1B] mb-1">NEAPOLITAN</h4>
                                <p>Crafted with long-rested dough, giving you a pillowy centre, crispy edges, and that signature smoky char.</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {section.items.map(item => <PizzaItemCard key={item.name} item={item} />)}
                    </div>
                </div>
            </section>
        );
    }

    switch (section.id) {
        case 'whispers-of-love':
            CardComponent = WhispersOfLoveCard;
            gridCols = 'grid-cols-1 md:grid-cols-2';
            break;

        case 'classic-espresso-bar':
            CardComponent = MenuItemCard;
            break;
        case 'craft-coffees':
            CardComponent = CraftMenuItemCard;
            break;
        case 'cold-brews':
        case 'frappe-to-go':
            CardComponent = ColdFrappeItemCard;
            break;
        case 'bites-for-sides':
        case 'healthy-salads':
        case 'fries-corner':
        case 'pasta':
            CardComponent = BitesItemCard;
            break;
        case 'sandwiches':
        case 'burgers':
            CardComponent = BitesItemCard;
            break;
        case 'shakes':
            CardComponent = ShakeItemCard;
            gridCols = 'grid-cols-2 md:grid-cols-3';
            break;
        case 'dessert':
            CardComponent = DessertItemCard;
            break;
        case 'blue-dream':
            CardComponent = SpecialBlueDreamCard;
            gridCols = 'grid-cols-1 md:grid-cols-2';
            break;
        case 'matcha':
            CardComponent = MatchaCard;
            break;
        case 'affogato':
        case 'hot-teas':
        case 'iced-teas':
        case 'hot-chocolate':
        case 'craft-mocktails':
        case 'healthy-juices':
        case 'smoothies':
        case 'beverage-companions':
        case 'garlic-bread':
        case 'calzone':
        case 'meal-bowls':
        case 'ramen-tales':
        case 'meal-combos':
            CardComponent = MenuItemCard;
            break;
        default:
            CardComponent = MenuItemCard;
    }

    return (
        <section id={section.id} className="reveal">
            {section.preheader && (
                <p className="font-sans text-sm font-medium uppercase tracking-widest text-[#5A2E1B] text-center mb-2">{section.preheader}</p>
            )}
            <div className="flex items-end gap-3 mb-6 px-1">
                {section.id === 'ramen-tales' && (
                    <iconify-icon icon="fluent-emoji-high-contrast:chopsticks" className="text-[#5A2E1B] text-2xl mb-1 opacity-60"></iconify-icon>
                )}
                <h3 className="font-script text-3xl text-[#5A2E1B]">{section.title}</h3>
                <span className="h-px flex-1 bg-[#8B4A27]/20 mb-2"></span>
                {section.id === 'ramen-tales' && (
                    <iconify-icon icon="fluent-emoji-high-contrast:steaming-bowl" className="text-[#5A2E1B] text-2xl mb-1 opacity-60"></iconify-icon>
                )}
            </div>
            {section.subtitle && (
                <p className="font-sans text-xs text-center text-[#6B3A20]/80 italic -mt-4 mb-6 max-w-lg mx-auto whitespace-pre-line">{section.subtitle}</p>
            )}
            <div className={`grid ${gridCols} gap-3`}>
                {section.items.map(item => <CardComponent key={item.name} item={item} />)}
            </div>
            {section.id === 'beverage-companions' && (
                <div className="mt-12 text-center space-y-2 reveal">
                    <p className="font-script text-3xl text-[#8B4A27]">“Impressed by the drinks?<br />scroll the page”</p>
                    <p className="font-sans text-sm font-medium uppercase tracking-widest text-[#5A2E1B]">The food's ready to steal the show!</p>
                </div>
            )}
        </section>
    );
};

export default function MenuClient({ sections }: { sections: MenuSection[] }) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navRef = useRef<HTMLUListElement>(null);
    const navLinks = sections;

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-100px 0px -60% 0px', // Focus on top-ish part of viewport
            threshold: 0
        };

        const activeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        const revealElementsSnapshot = document.querySelectorAll('section[id]');
        revealElementsSnapshot.forEach(el => activeObserver.observe(el));

        // Original reveal observer
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => revealObserver.observe(el));

        return () => {
            revealElementsSnapshot.forEach(el => activeObserver.unobserve(el));
            revealElements.forEach(el => {
                try {
                    revealObserver.unobserve(el);
                } catch (e) { }
            });
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Auto-scroll nav bar to active item
    useEffect(() => {
        if (activeSection && navRef.current) {
            const activeItem = navRef.current.querySelector(`[data-section="${activeSection}"]`);
            if (activeItem) {
                const navContainer = navRef.current;
                const itemOffset = (activeItem as HTMLElement).offsetLeft;
                const itemWidth = (activeItem as HTMLElement).offsetWidth;
                const containerWidth = navContainer.offsetWidth;

                // Center the active item
                navContainer.scrollTo({
                    left: itemOffset - (containerWidth / 2) + (itemWidth / 2),
                    behavior: 'smooth'
                });
            }
        }
    }, [activeSection]);


    return (
        <>
            <header className="pt-6 sm:pt-8 pb-4 px-4 sm:px-6 flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-2 reveal active">
                    <Image
                        src="/logo.png"
                        alt="Cafe 9:50 Logo"
                        width={180}
                        height={60}
                        className="h-12 w-auto object-contain"
                        priority
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="w-10 h-10 rounded-full border border-[#8B4A27]/20 flex items-center justify-center hover:bg-[#8B4A27] hover:text-[#f2e6d9] transition-colors reveal active duration-500"
                        aria-label="Open menu"
                    >
                        <iconify-icon icon="solar:hamburger-menu-linear" width="20"></iconify-icon>
                    </button>
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="w-10 h-10 rounded-full border border-[#8B4A27]/20 flex items-center justify-center hover:bg-[#8B4A27] hover:text-[#f2e6d9] transition-colors reveal active duration-500 delay-100"
                    >
                        <iconify-icon icon="solar:magnifer-linear" width="20"></iconify-icon>
                    </button>
                </div>
            </header>

            {/* Hamburger Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-[100] animate-in fade-in duration-300">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsMenuOpen(false)}
                    ></div>

                    {/* Side Menu */}
                    <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl animate-in slide-in-from-left duration-300">
                        <div className="p-6">
                            {/* Close Button */}
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                                aria-label="Close menu"
                            >
                                <iconify-icon icon="solar:close-circle-linear" width="24" className="text-gray-600"></iconify-icon>
                            </button>

                            {/* Menu Title */}
                            <h2 className="font-script text-2xl text-[#5A2E1B] mb-8 mt-2">Quick Links</h2>

                            {/* Menu Items */}
                            <nav className="space-y-4">
                                <a
                                    href="https://www.instagram.com/CAFENINE50"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#8B4A27]/5 transition-colors group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                                        <iconify-icon icon="hugeicons:instagram" width="24" className="text-white"></iconify-icon>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-sans text-sm font-semibold text-[#5A2E1B] group-hover:text-[#8B4A27] transition-colors">Instagram</p>
                                        <p className="font-sans text-xs text-gray-500">@cafenine50</p>
                                    </div>
                                    <iconify-icon icon="solar:alt-arrow-right-linear" width="20" className="text-gray-400 group-hover:text-[#8B4A27] transition-colors"></iconify-icon>
                                </a>

                                <a
                                    href="tel:+918349476548"
                                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#8B4A27]/5 transition-colors group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                                        <iconify-icon icon="solar:phone-linear" width="24" className="text-white"></iconify-icon>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-sans text-sm font-semibold text-[#5A2E1B] group-hover:text-[#8B4A27] transition-colors">Call Us</p>
                                        <p className="font-sans text-xs text-gray-500">+91 8349476548</p>
                                    </div>
                                    <iconify-icon icon="solar:alt-arrow-right-linear" width="20" className="text-gray-400 group-hover:text-[#8B4A27] transition-colors"></iconify-icon>
                                </a>

                                <a
                                    href="https://g.page/r/CWIq9zqRzizWEBM/review"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#8B4A27]/5 transition-colors group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                                        <iconify-icon icon="solar:star-linear" width="24" className="text-white"></iconify-icon>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-sans text-sm font-semibold text-[#5A2E1B] group-hover:text-[#8B4A27] transition-colors">Review Us</p>
                                        <p className="font-sans text-xs text-gray-500">Google Reviews</p>
                                    </div>
                                    <iconify-icon icon="solar:alt-arrow-right-linear" width="20" className="text-gray-400 group-hover:text-[#8B4A27] transition-colors"></iconify-icon>
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            )}

            {isSearchOpen && (
                <div className="fixed inset-0 z-[100] bg-white px-6 py-8 animate-in fade-in slide-in-from-top duration-300">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex-1 relative">
                                <iconify-icon icon="solar:magnifer-linear" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></iconify-icon>
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search for coffee, pizza, desserts..."
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4A27]/20 transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={() => {
                                    setIsSearchOpen(false);
                                    setSearchQuery('');
                                }}
                                className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                            >
                                <iconify-icon icon="solar:close-circle-linear" width="24"></iconify-icon>
                            </button>
                        </div>

                        <div className="overflow-y-auto max-h-[calc(100vh-180px)] no-scrollbar pb-20">
                            {searchQuery ? (
                                <div className="space-y-8">
                                    {sections.map(section => {
                                        const filteredItems = section.items.filter(item =>
                                            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            item.description?.toLowerCase().includes(searchQuery.toLowerCase())
                                        );

                                        if (filteredItems.length === 0) return null;

                                        return (
                                            <div key={section.id}>
                                                <h3 className="font-script text-2xl text-[#5A2E1B] mb-4 flex items-center gap-3">
                                                    {section.title}
                                                    <span className="h-px flex-1 bg-gray-100"></span>
                                                </h3>
                                                {(() => {
                                                    const { CardComponent, gridCols } = getSectionConfig(section.id);
                                                    return (
                                                        <div className={`grid ${gridCols} gap-3`}>
                                                            {filteredItems.map(item => (
                                                                <CardComponent key={item.name} item={item} />
                                                            ))}
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                        )
                                    })}
                                    {sections.every(section =>
                                        !section.items.some(item =>
                                            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            item.description?.toLowerCase().includes(searchQuery.toLowerCase())
                                        )
                                    ) && (
                                            <div className="text-center py-20">
                                                <iconify-icon icon="solar:map-point-remove-linear" width="48" className="text-gray-200 mb-4"></iconify-icon>
                                                <p className="text-gray-400 font-sans">No items matched your search.</p>
                                            </div>
                                        )}
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {[
                                        { name: 'Drinks', section: 'cold-brews' },
                                        { name: 'Shakes', section: 'shakes' },
                                        { name: 'Food', section: 'bites-for-sides' },
                                        { name: 'Sandwich', section: 'sandwiches' },
                                        { name: 'Burger', section: 'burgers' },
                                        { name: 'Pasta', section: 'pasta' },
                                        { name: 'Pizza', section: 'pizza' },
                                        { name: 'Meal Combo', section: 'meal-combos' },
                                        { name: 'Desserts', section: 'dessert' }
                                    ].map(category => (
                                        <button
                                            key={category.name}
                                            onClick={() => {
                                                setIsSearchOpen(false);
                                                setSearchQuery('');
                                                const element = document.getElementById(category.section);
                                                if (element) {
                                                    const headerOffset = 100;
                                                    const elementPosition = element.getBoundingClientRect().top;
                                                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                                                    window.scrollTo({
                                                        top: offsetPosition,
                                                        behavior: 'smooth'
                                                    });
                                                }
                                            }}
                                            className="p-4 rounded-2xl bg-gray-100/50 border border-gray-100 text-center hover:bg-[#8B4A27]/5 hover:border-[#8B4A27]/20 transition-all group"
                                        >
                                            <p className="font-sans text-xs font-semibold text-[#5A2E1B] group-hover:text-[#8B4A27] transition-colors">{category.name}</p>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <nav className="sticky top-0 z-40 glass-nav border-b border-[#8B4A27]/10 mb-6 sm:mb-8">
                <div className="max-w-7xl mx-auto px-2 sm:px-4">
                    <ul ref={navRef} className="flex gap-2 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory py-3 sm:py-4 px-1">
                        {navLinks.map((section) => {
                            const isActive = activeSection === section.id;
                            return (
                                <li key={section.id} className="snap-start" data-section={section.id}>
                                    <a
                                        href={`#${section.id}`}
                                        className={`whitespace-nowrap px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-sans text-xs sm:text-sm font-semibold transition-all duration-300 active:scale-95 ${isActive
                                            ? 'bg-[#8B4A27] text-[#f2e6d9] shadow-lg shadow-[#8B4A27]/30 scale-105'
                                            : 'bg-[#fffefb] border border-[#8B4A27]/15 text-[#5A2E1B] hover:bg-[#8B4A27]/5'
                                            }`}
                                    >
                                        {section.title}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
                <section className="reveal relative overflow-hidden rounded-2xl bg-[#fffefb] border border-[#8B4A27]/10 p-8 text-center shadow-sm">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B4A27]/40 to-transparent"></div>
                    <div className="flex items-center justify-center gap-4 mb-3">
                        <iconify-icon icon="solar:cup-hot-linear" width="32" className="text-[#8B4A27] opacity-80"></iconify-icon>
                        <iconify-icon icon="fluent-emoji-high-contrast:pizza" width="32" className="text-[#8B4A27] opacity-80"></iconify-icon>
                        <iconify-icon icon="solar:donut-bitten-linear" width="32" className="text-[#8B4A27] opacity-80"></iconify-icon>
                    </div>
                    <h2 className="font-script text-4xl text-[#5A2E1B] mb-2">Brewing Memories</h2>
                    <p className="font-sans text-[10px] sm:text-xs opacity-70 max-w-sm mx-auto leading-relaxed text-center px-4">Authentic Coffee • Handcrafted Pizza <br /> Irresistible Desserts</p>
                    <p className="font-sans text-[10px] sm:text-xs font-medium text-[#8B4A27] mt-3">Prices are exclusive of GST. Applicable GST will be added to your bill.</p>
                </section>

                {sections.map((section, index) => {
                    // Group pizza, garlic-bread, and calzone together
                    if (section.id === 'pizza') {
                        const garlicBreadSection = sections.find(s => s.id === 'garlic-bread');
                        const calzoneSection = sections.find(s => s.id === 'calzone');

                        return (
                            <section key={section.id} id="pizza" className="reveal -mx-4 sm:-mx-6 px-4 sm:px-6 py-8 bg-gradient-to-br from-[#f5e6d3] via-[#f2e6d9] to-[#ede0d0] rounded-2xl border border-[#8B4A27]/10 shadow-sm">
                                <div className="max-w-7xl mx-auto space-y-12">
                                    {/* Pizza Section */}
                                    <div>
                                        {section.preheader && (
                                            <div className="flex items-center justify-center gap-3 mb-2">
                                                <iconify-icon icon="game-icons:wood-pile" className="text-[#8B4A27] text-lg opacity-70"></iconify-icon>
                                                <p className="font-sans text-sm font-medium uppercase tracking-widest text-[#5A2E1B]">{section.preheader}</p>
                                                <iconify-icon icon="game-icons:wood-pile" className="text-[#8B4A27] text-lg opacity-70"></iconify-icon>
                                            </div>
                                        )}
                                        <div className="flex items-end gap-3 mb-6 px-1">
                                            <iconify-icon icon="mdi:fire" className="text-[#D2691E] text-3xl mb-1 opacity-80"></iconify-icon>
                                            <h3 className="font-script text-3xl text-[#5A2E1B]">{section.title}</h3>
                                            <span className="h-px flex-1 bg-[#8B4A27]/20 mb-2"></span>
                                            <iconify-icon icon="mdi:fire" className="text-[#D2691E] text-3xl mb-1 opacity-80"></iconify-icon>
                                        </div>

                                        <div className="text-center -mt-4 mb-8 max-w-2xl mx-auto bg-white/50 p-6 rounded-xl border border-[#8B4A27]/10">
                                            <p className="font-sans text-sm font-medium uppercase tracking-widest text-[#5A2E1B] mb-4">Choice of Base</p>
                                            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-xs text-[#6B3A20]/80">
                                                <div>
                                                    <h4 className="font-sans font-semibold text-sm text-[#5A2E1B] mb-1">NEW YORK STYLE</h4>
                                                    <p>A thin, hand-tossed crust, soft in the center, crisp at the edge, and perfectly foldable.</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-sans font-semibold text-sm text-[#5A2E1B] mb-1">NEAPOLITAN</h4>
                                                    <p>Crafted with long-rested dough, giving you a pillowy centre, crispy edges, and that signature smoky char.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {section.items.map(item => <PizzaItemCard key={item.name} item={item} />)}
                                        </div>
                                    </div>

                                    {/* Garlic Bread Section */}
                                    {garlicBreadSection && (
                                        <div id="garlic-bread">
                                            <div className="flex items-end gap-3 mb-6 px-1">
                                                <h3 className="font-script text-3xl text-[#5A2E1B]">{garlicBreadSection.title}</h3>
                                                <span className="h-px flex-1 bg-[#8B4A27]/20 mb-2"></span>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                                {garlicBreadSection.items.map(item => <MenuItemCard key={item.name} item={item} />)}
                                            </div>
                                        </div>
                                    )}

                                    {/* Calzone Section */}
                                    {calzoneSection && (
                                        <div id="calzone">
                                            <div className="flex items-end gap-3 mb-6 px-1">
                                                <h3 className="font-script text-3xl text-[#5A2E1B]">{calzoneSection.title}</h3>
                                                <span className="h-px flex-1 bg-[#8B4A27]/20 mb-2"></span>
                                            </div>
                                            {calzoneSection.subtitle && (
                                                <p className="font-sans text-xs text-center text-[#6B3A20]/80 italic -mt-4 mb-6 max-w-lg mx-auto whitespace-pre-line">{calzoneSection.subtitle}</p>
                                            )}
                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                                {calzoneSection.items.map(item => <MenuItemCard key={item.name} item={item} />)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </section>
                        );
                    }

                    // Skip garlic-bread and calzone as they're rendered with pizza
                    if (section.id === 'garlic-bread' || section.id === 'calzone') {
                        return null;
                    }

                    return <SectionComponent key={section.id} section={section} />;
                })}
                <div className="max-w-7xl mx-auto py-4 text-center reveal">
                    <p className="font-sans text-[10px] sm:text-xs font-medium text-[#8B4A27] bg-[#8B4A27]/5 py-3 px-6 rounded-xl inline-block border border-[#8B4A27]/10">Prices are exclusive of GST. Applicable GST will be added to your bill.</p>
                </div>

            </main>

            <footer className="mt-20 text-center py-10 px-6 border-t border-[#8B4A27]/10 bg-white/40 reveal">
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <iconify-icon icon="solar:cup-hot-linear" width="24" className="text-[#8B4A27] opacity-50"></iconify-icon>
                        <iconify-icon icon="fluent-emoji-high-contrast:pizza" width="24" className="text-[#8B4A27] opacity-50"></iconify-icon>
                        <iconify-icon icon="solar:donut-bitten-linear" width="24" className="text-[#8B4A27] opacity-50"></iconify-icon>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 sm:gap-6 mb-12 text-[#8B4A27] w-full max-w-3xl">
                        <a href="https://www.instagram.com/CAFENINE50" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform flex flex-col items-center gap-2">
                            <iconify-icon icon="hugeicons:instagram" width="24"></iconify-icon>
                            <span className="font-sans text-[11px] lowercase tracking-wider">@cafenine50</span>
                        </a>
                        <a href="tel:+918349476548" className="hover:scale-105 transition-transform flex flex-col items-center gap-2">
                            <iconify-icon icon="solar:phone-linear" width="24"></iconify-icon>
                            <span className="font-sans text-[11px] tracking-wider">+91 8349476548</span>
                        </a>
                        <a href="http://CAFENINE50.COM" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform flex flex-col items-center gap-2">
                            <iconify-icon icon="solar:globus-linear" width="24"></iconify-icon>
                            <span className="font-sans text-[11px] uppercase tracking-wider">cafenine50.com</span>
                        </a>
                        <a href="https://www.google.com/search?q=cafe+9:50+reviews&zx=1770143981473&no_sw_cr=1#ebo=1" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform flex flex-col items-center gap-2">
                            <iconify-icon icon="solar:star-linear" width="24"></iconify-icon>
                            <span className="font-sans text-[11px] lowercase tracking-wider">review us</span>
                        </a>
                    </div>

                    <div className="max-w-md mx-auto mb-10 text-center">
                        <p className="font-sans text-[10px] text-[#5A2E1B]/60 uppercase tracking-[0.2em] mb-3">Visit Us</p>
                        <p className="font-sans text-[12px] text-[#5A2E1B] leading-relaxed">
                            5, AZAD NAGAR, INFRONT OF PUSHPA MISSION HOSPITAL,<br />
                            UJJAIN (M.P) 456010
                        </p>
                    </div>

                    <div className="w-full border-t border-[#8B4A27]/5 pt-8">
                        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#5A2E1B] mb-2 font-medium">Cafe 9:50</p>
                        <p className="font-sans text-xs text-[#5A2E1B]/50">
                            Made with love by <a href="https://zaaykatech.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#8B4A27] underline transition-colors">zaaykatech.com</a>
                        </p>
                    </div>
                </div>
            </footer>

            {showBackToTop && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#8B4A27] text-white shadow-lg hover:bg-[#6B3A20] transition-all duration-300 flex items-center justify-center z-50 animate-in fade-in slide-in-from-bottom"
                    aria-label="Back to top"
                >
                    <iconify-icon icon="solar:alt-arrow-up-linear" width="20" class="sm:w-6"></iconify-icon>
                </button>
            )}
        </>
    );
}
