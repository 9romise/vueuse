import { enableAutoUnmount, mount } from '@vue/test-utils'
import { unrefElement } from '@vueuse/core'
import Sortable from 'sortablejs'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, shallowRef, useTemplateRef } from 'vue'
import { useSortable } from './index'

describe('useSortable', () => {
  enableAutoUnmount(afterEach)

  it('should initialise Sortable', () => {
    const wrapper = mount(defineComponent({
      template: '<div ref="el"></div>',
      setup() {
        const el = useTemplateRef<HTMLElement>('el')
        const list = shallowRef<string[]>([])
        const result = useSortable(el, list, {
        })

        return { ...result, el }
      },
    }))
    const vm = wrapper.vm
    const sortable = Sortable.get(vm.el!)
    expect(sortable).toBeDefined()
  })

  it('should accept selectors as el', () => {
    const wrapper = mount(defineComponent({
      template: '<div ref="el" id="el"></div>',
      setup() {
        const el = useTemplateRef<HTMLElement>('el')
        const list = shallowRef<string[]>([])
        const result = useSortable('#el', list, {
        })

        return { ...result, el }
      },
    }), {
      attachTo: document.body,
    })
    const vm = wrapper.vm
    const sortable = Sortable.get(vm.el!)
    expect(sortable).toBeDefined()
  })

  describe('stop', () => {
    it('should destroy instance', () => {
      const wrapper = mount(defineComponent({
        template: '<div ref="el"></div>',
        setup() {
          const el = useTemplateRef<HTMLElement>('el')
          const list = shallowRef<string[]>([])
          const result = useSortable(el, list, {
          })

          return { ...result, el }
        },
      }))
      const vm = wrapper.vm
      const sortable = Sortable.get(vm.el!)
      expect(sortable).toBeDefined()
      vm.stop()
      expect(Sortable.get(vm.el!)).toEqual(null)
    })
  })

  describe('start', () => {
    it('can recreate sortable after being stopped', () => {
      const wrapper = mount(defineComponent({
        template: '<div ref="el"></div>',
        setup() {
          const el = useTemplateRef<HTMLElement>('el')
          const list = shallowRef<string[]>([])
          const result = useSortable(el, list, {
          })

          return { ...result, el }
        },
      }))
      const vm = wrapper.vm
      const sortable = Sortable.get(vm.el!)
      expect(sortable).toBeDefined()
      vm.stop()
      expect(Sortable.get(vm.el!)).toEqual(null)
      vm.start()
      expect(Sortable.get(vm.el!)).toBeDefined()
    })
  })

  describe('option', () => {
    it('should set option in sortable', () => {
      const wrapper = mount(defineComponent({
        template: '<div ref="el"></div>',
        setup() {
          const el = useTemplateRef<HTMLElement>('el')
          const list = shallowRef<string[]>([])
          const result = useSortable(el, list, {
          })

          return { ...result, el }
        },
      }))
      const vm = wrapper.vm
      const sortable = Sortable.get(vm.el!)
      expect(sortable?.option('disabled')).toEqual(false)
      vm.option('disabled', true)
      expect(sortable?.option('disabled')).toEqual(true)
    })

    it('should get option in sortable', () => {
      const wrapper = mount(defineComponent({
        template: '<div ref="el"></div>',
        setup() {
          const el = useTemplateRef<HTMLElement>('el')
          const list = shallowRef<string[]>([])
          const result = useSortable(el, list, {
          })

          return { ...result, el }
        },
      }))
      const vm = wrapper.vm
      expect(vm.option('disabled')).toEqual(false)
    })
  })

  it('accepts component refs', () => {
    const SubComponent = defineComponent({
      template: '<p>foo</p>',
    })
    const wrapper = mount(defineComponent({
      components: { SubComponent },
      template: '<SubComponent ref="el"></SubComponent>',
      setup() {
        const el = useTemplateRef<InstanceType<typeof SubComponent>>('el')
        const list = shallowRef<string[]>([])
        const result = useSortable(el, list, {
        })

        return { ...result, el }
      },
    }))
    const vm = wrapper.vm
    const el = unrefElement(vm.el) as HTMLElement
    const sortable = Sortable.get(el)
    expect(sortable).toBeDefined()
  })
})
