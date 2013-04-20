module MenuSplitHelper
  def split_fun_posts
    years = {}
    
    @site.config[:funposts].each do |i|
       (yr, mn, dy) = i[:title].to_s.split("-")
       years[yr] = {} unless years.has_key? yr
       
       years[yr][mn] = {} unless years[yr].has_key? mn
       
       years[yr][mn][dy] = i
    end
    
    years
  end
end