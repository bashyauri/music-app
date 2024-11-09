import SongItem from '@/components/SongItem.vue'
import { shallowMount } from '@vue/test-utils'

describe('SongItem.vue', () => {
  test('render song.display_name ', () => {
    const song = {
      display_name: 'Test'
    }
    const wrapper = shallowMount(SongItem, {
      props: { song }
    })

    expect(wrapper.text()).toContain(song.display_name)
  })
})
