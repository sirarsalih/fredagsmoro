module NextPrevHelper
  def next_fun
    index = @site.config[:funposts].find_index(@item)

    if index > 0
      fun = @site.config[:funposts][index - 1]

      if fun
        "Next: #{link_to fun[:title], fun.path}"
      end
    end
  end
  
  def prev_fun
    index = @site.config[:funposts].find_index(@item)

    if index < @site.config[:funposts].size
      fun = @site.config[:funposts][index + 1]

      if fun
        "Previous: #{link_to fun[:title], fun.path}"
      end
    end
  end
end