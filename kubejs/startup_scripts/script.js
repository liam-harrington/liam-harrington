// priority: 0

console.info('Hello, World! (You will only see this line once in console, during startup)')

// Listen to item registry event
onEvent('item.registry', event => {
  
  // The texture for this item has to be placed in kubejs/assets/kubejs/textures/item/test_item.png
  // If you want a custom item model, you can create one in Blockbench and put it in kubejs/assets/kubejs/models/item/test_item.json
  event.create('coffe_clay_mug')
  event.create('coffe_mug')

  event.create('coffe_mug_filled')
    .maxStackSize(3)
    .useAnimation("drink")
    // mandatory
    .useDuration((itemstack) => 64)
    .use((level, player, hand) => true)
    // ---------
    .finishUsing((itemstack, level, entity) => {
      let effects = entity.potionEffects;
      effects.add("haste", 120 * 20)
      if (entity.creativeMode) {

      } else {
        itemstack.itemStack.shrink(1)
        if (entity.player) {
          entity.minecraftPlayer.addItem(Item.of("kubejs:coffe_mug").itemStack)
        }
      }
      return itemstack;
    })
    
    // ##########################################
    
    event.create('wither_skull_catcher')
      .unstackable()
    
    event.create('warped_leech')
    event.create('crimson_leech')
    
    event.create('vile')
    event.create('warped_leech_vile')
    event.create('crimson_leech_vile')
    event.create('vex_soul_vile')
    event.create('piglin_brute_blood_vile')
    
})

onEvent('block.registry', event => {
	// Register new blocks here
	// event.create('example_block').material('wood').hardness(1.0).displayName('Example Block')
})

onEvent('item.entity_interact', event => {
 if (event.item.id == "kubejs:vile") {
   if (event.target.type == "minecraft:vex") {
     event.target.kill()
     if (event.player.creativeMode) {
     } else {
       event.item.count--
     }
  	 event.player.give("kubejs:vex_soul_vile")
   } else if (event.target.type == "minecraft:piglin_brute") {
     event.target.kill()
     if (event.player.creativeMode) {
     } else {
       event.item.count--
     }
  	 event.player.give("kubejs:piglin_brute_blood_vile")
   }

 } else if (event.target.type == "minecraft:wither_skeleton" && event.item.id == "kubejs:wither_skull_catcher") {
   event.target.kill()
   event.player.give("minecraft:wither_skeleton_skull")
 }
})

onEvent('recipes', event => {
	event.smelting('1x kubejs:coffe_mug', 'kubejs:coffe_clay_mug')
	event.blasting('1x kubejs:coffe_mug', 'kubejs:coffe_clay_mug')
	
	event.shapeless('kubejs:wither_skull_catcher', ['minecraft:shulker_shell', 'minecraft:wither_rose'])
	
	/*
    event.recipes.createFilling('kubejs:coffe_mug_filled', [
      'kubejs:coffe_mug',
      Fluid.of('minecraft:lava', 250)
    ])
    */
})
