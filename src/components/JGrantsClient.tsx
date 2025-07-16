import React, { useState } from 'react'

interface SubsidyItem {
  id: string
  title: string
  description: string
  organization: string
  acceptanceStartDate?: string
  acceptanceEndDate?: string
  maxAmount?: string
  url?: string
}

interface SearchParams {
  keyword: string
  sort: string
  order: string
  acceptance: string
  limit: number
  offset: number
}

const JGrantsClient: React.FC = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    keyword: '',
    sort: 'created_date',
    order: 'DESC',
    acceptance: '1',
    limit: 20,
    offset: 0
  })
  
  const [subsidies, setSubsidies] = useState<SubsidyItem[]>([])
  const [selectedSubsidy, setSelectedSubsidy] = useState<SubsidyItem | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState(0)

  const searchSubsidies = async () => {
    if (!searchParams.keyword.trim()) {
      setError('キーワードを入力してください')
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      const params = new URLSearchParams({
        keyword: searchParams.keyword,
        sort: searchParams.sort,
        order: searchParams.order,
        acceptance: searchParams.acceptance,
        limit: searchParams.limit.toString(),
        offset: searchParams.offset.toString()
      })

      // CORS回避のためプロキシを使用
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      const proxyUrl = `https://thingproxy.freeboard.io/fetch/https://api.info.jgrants-portal.go.jp/subsidies?${params}`;
      const response = await fetch(proxyUrl, { headers })
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.result && Array.isArray(data.result)) {
        const transformedSubsidies: SubsidyItem[] = data.result.map((item: any) => ({
          id: item.id || '',
          title: item.title || '補助金名未設定',
          description: item.overview || item.purpose || '',
          organization: item.organization || '',
          acceptanceStartDate: item.acceptance_start_date,
          acceptanceEndDate: item.acceptance_end_date,
          maxAmount: item.max_amount,
          url: item.url
        }))
        
        setSubsidies(transformedSubsidies)
        setTotalCount(data.count || 0)
      } else {
        setSubsidies([])
        setTotalCount(0)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '検索中にエラーが発生しました')
      setSubsidies([])
    } finally {
      setLoading(false)
    }
  }

  const getSubsidyDetail = async (id: string) => {
    setLoading(true)
    setError(null)
    
    try {
      // CORS回避のためプロキシを使用
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      const proxyUrl = `https://thingproxy.freeboard.io/fetch/https://api.info.jgrants-portal.go.jp/subsidies/id/${id}`;
      const response = await fetch(proxyUrl, { headers })
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.result && data.result.length > 0) {
        const item = data.result[0]
        const detailSubsidy: SubsidyItem = {
          id: item.id || '',
          title: item.title || '補助金名未設定',
          description: item.overview || item.purpose || '',
          organization: item.organization || '',
          acceptanceStartDate: item.acceptance_start_date,
          acceptanceEndDate: item.acceptance_end_date,
          maxAmount: item.max_amount,
          url: item.url
        }
        
        setSelectedSubsidy(detailSubsidy)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '詳細取得中にエラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof SearchParams, value: string | number) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNextPage = () => {
    const newOffset = searchParams.offset + searchParams.limit
    setSearchParams(prev => ({ ...prev, offset: newOffset }))
  }

  const handlePrevPage = () => {
    const newOffset = Math.max(0, searchParams.offset - searchParams.limit)
    setSearchParams(prev => ({ ...prev, offset: newOffset }))
  }

  const currentPage = Math.floor(searchParams.offset / searchParams.limit) + 1
  const totalPages = Math.ceil(totalCount / searchParams.limit)

  return (
    <div>
      <section className="search-section">
        <h2>補助金検索</h2>
        
        <div className="form-group">
          <label htmlFor="keyword">キーワード (必須)</label>
          <input
            type="text"
            id="keyword"
            value={searchParams.keyword}
            onChange={(e) => handleInputChange('keyword', e.target.value)}
            placeholder="検索したいキーワードを入力"
          />
        </div>

        <div className="form-group">
          <label htmlFor="sort">ソート項目</label>
          <select
            id="sort"
            value={searchParams.sort}
            onChange={(e) => handleInputChange('sort', e.target.value)}
          >
            <option value="created_date">作成日</option>
            <option value="updated_date">更新日</option>
            <option value="acceptance_start_date">受付開始日</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="order">ソート順</label>
          <select
            id="order"
            value={searchParams.order}
            onChange={(e) => handleInputChange('order', e.target.value)}
          >
            <option value="DESC">降順</option>
            <option value="ASC">昇順</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="acceptance">受付期間</label>
          <select
            id="acceptance"
            value={searchParams.acceptance}
            onChange={(e) => handleInputChange('acceptance', e.target.value)}
          >
            <option value="1">受付中のみ</option>
            <option value="0">すべて</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="limit">表示件数</label>
          <select
            id="limit"
            value={searchParams.limit}
            onChange={(e) => handleInputChange('limit', parseInt(e.target.value))}
          >
            <option value="10">10件</option>
            <option value="20">20件</option>
            <option value="50">50件</option>
          </select>
        </div>

        <div className="search-buttons">
          <button
            className="btn btn-primary"
            onClick={searchSubsidies}
            disabled={loading || !searchParams.keyword.trim()}
          >
            {loading ? '検索中...' : '検索'}
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setSearchParams({
                keyword: '',
                sort: 'created_date',
                order: 'DESC',
                acceptance: '1',
                limit: 20,
                offset: 0
              })
              setSubsidies([])
              setSelectedSubsidy(null)
              setError(null)
            }}
          >
            クリア
          </button>
        </div>
      </section>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {selectedSubsidy && (
        <section className="results-section">
          <h2>補助金詳細</h2>
          <button
            className="btn btn-secondary"
            onClick={() => setSelectedSubsidy(null)}
            style={{ marginBottom: '1rem' }}
          >
            ← 一覧に戻る
          </button>
          
          <div className="subsidy-item">
            <h3>{selectedSubsidy.title}</h3>
            {selectedSubsidy.description && (
              <p>{selectedSubsidy.description}</p>
            )}
            <div className="subsidy-meta">
              {selectedSubsidy.organization && <span>実施機関: {selectedSubsidy.organization}</span>}
              {selectedSubsidy.acceptanceStartDate && <span>受付開始: {selectedSubsidy.acceptanceStartDate}</span>}
              {selectedSubsidy.acceptanceEndDate && <span>受付終了: {selectedSubsidy.acceptanceEndDate}</span>}
              {selectedSubsidy.maxAmount && <span>上限額: {selectedSubsidy.maxAmount}</span>}
            </div>
            {selectedSubsidy.url && (
              <p style={{ marginTop: '1rem' }}>
                <a href={selectedSubsidy.url} target="_blank" rel="noopener noreferrer">
                  詳細ページを開く
                </a>
              </p>
            )}
          </div>
        </section>
      )}

      {!selectedSubsidy && subsidies.length > 0 && (
        <section className="results-section">
          <h2>検索結果 ({totalCount}件)</h2>
          
          {subsidies.map((subsidy) => (
            <div key={subsidy.id} className="subsidy-item">
              <h3>
                <button
                  onClick={() => getSubsidyDetail(subsidy.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#667eea',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                    textAlign: 'left'
                  }}
                >
                  {subsidy.title}
                </button>
              </h3>
              {subsidy.description && (
                <p>{subsidy.description.length > 200 
                    ? `${subsidy.description.substring(0, 200)}...` 
                    : subsidy.description}
                </p>
              )}
              <div className="subsidy-meta">
                {subsidy.organization && <span>実施機関: {subsidy.organization}</span>}
                {subsidy.acceptanceStartDate && <span>受付開始: {subsidy.acceptanceStartDate}</span>}
                {subsidy.acceptanceEndDate && <span>受付終了: {subsidy.acceptanceEndDate}</span>}
              </div>
            </div>
          ))}

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="btn btn-secondary"
                onClick={handlePrevPage}
                disabled={searchParams.offset === 0}
              >
                前のページ
              </button>
              <span>{currentPage} / {totalPages}</span>
              <button
                className="btn btn-secondary"
                onClick={handleNextPage}
                disabled={searchParams.offset + searchParams.limit >= totalCount}
              >
                次のページ
              </button>
            </div>
          )}
        </section>
      )}

      {loading && (
        <div className="loading">
          読み込み中...
        </div>
      )}
    </div>
  )
}

export default JGrantsClient