<template>
    <div class="mt-2 mb-2 hover:bg-gray-900 hover:text-white">
        <div class="grid grid-cols-3 pb-2">
            <div class="col-span-1" >
               <slot name="image"></slot>
            </div>

            <div class="col-span-2 text-left mt-1" >
                <div class="text-2xl">
                    <slot name="productName" />
                </div>
                <div>
                    <slot name="price" />
                </div>
                <div>
                    <slot name="brand" />
                </div>
                <div>
                    <slot name="color" />
                </div>
            </div>
        </div>
    </div>
</template>





