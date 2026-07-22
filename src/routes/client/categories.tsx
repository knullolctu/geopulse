import React, { useState, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCategoriesFn, createCategoryFn, updateCategoryFn, deleteCategoryFn, deleteCategoriesFn } from '../../lib/queries'
import { THEME } from '../../theme'
import { useNotification } from '../../components/Notification'
import Card from '../../components/Card'

export const Route = createFileRoute('/client/categories')({
  component: ClientCategoriesPage,
})

function ClientCategoriesPage() {
  const queryClient = useQueryClient()
  const { showNotif, confirm } = useNotification()
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [categoryName, setCategoryName] = useState('')

  const [isSelectionMode, setIsSelectionMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const { data: categories, isLoading } = useQuery({
    queryKey: ['client-categories'],
    queryFn: () => getCategoriesFn(),
  })

  const createMutation = useMutation({
    mutationFn: (data: { name: string }) => createCategoryFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-categories'] })
      showNotif('Category created successfully!', 'success')
      setIsModalOpen(false)
      setCategoryName('')
    },
    onError: (error: any) => {
      showNotif(`Failed to create category: ${error.message}`, 'error')
    }
  })

  const updateMutation = useMutation({
    mutationFn: (data: { id: string, name: string }) => updateCategoryFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-categories'] })
      showNotif('Category updated successfully!', 'success')
      setIsModalOpen(false)
      setEditingCategory(null)
      setCategoryName('')
    },
    onError: (error: any) => {
      showNotif(`Failed to update category: ${error.message}`, 'error')
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCategoryFn({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-categories'] })
      showNotif('Category deleted successfully!', 'success')
    },
    onError: (error: any) => {
      showNotif(`Failed to delete category: ${error.message}`, 'error')
    }
  })

  const bulkDeleteMutation = useMutation({
    mutationFn: (ids: string[]) => deleteCategoriesFn({ data: { ids } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-categories'] })
      showNotif(`Successfully deleted ${selectedIds.size} categories`, 'success')
      setSelectedIds(new Set())
      setIsSelectionMode(false)
    },
    onError: (error: any) => {
      showNotif(`Bulk delete failed: ${error.message}`, 'error')
    }
  })

  const filteredCategories = useMemo(() => {
    if (!categories) return []
    return categories.filter((c: any) => 
      c.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [categories, search])

  const handleEditClick = (category: any) => {
    setEditingCategory(category)
    setCategoryName(category.name)
    setIsModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!categoryName.trim()) return
    
    if (editingCategory) {
      updateMutation.mutate({ id: editingCategory.id, name: categoryName })
    } else {
      createMutation.mutate({ name: categoryName })
    }
  }

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredCategories.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filteredCategories.map((c: any) => c.id)))
    }
  }

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return
    const isConfirmed = await confirm({
        title: 'Bulk Delete?',
        message: `Are you sure you want to remove ${selectedIds.size} categories? This action cannot be undone.`,
        type: 'danger',
        confirmText: 'Delete All Selected'
    })
    if (isConfirmed) bulkDeleteMutation.mutate(Array.from(selectedIds))
  }

  if (isLoading) return <div className="p-8 font-black uppercase text-slate-400 animate-pulse">Accessing Category Archives...</div>

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 -m-4 md:-m-8">
      {/* STICKY HEADER */}
      <div 
        className="sticky top-0 z-20 p-4 md:p-8 bg-white/80 backdrop-blur-md border-b-4 border-slate-100"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 uppercase">Category Management</h2>
            <p className="text-slate-500 font-bold uppercase tracking-tight text-xs mt-1">Organize your personnel into departments or teams.</p>
            
            {categories && categories.length > 0 && (
                <div className="flex items-center gap-3 mt-4">
                    <button 
                        onClick={() => {
                            setIsSelectionMode(!isSelectionMode)
                            setSelectedIds(new Set())
                        }}
                        className={`px-4 py-2 rounded-xl font-black uppercase text-[9px] border-3 border-dark-border shadow-[4px_4px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all ${
                            isSelectionMode 
                                ? 'bg-slate-900 text-white' 
                                : 'bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                        {isSelectionMode ? '✕ Cancel' : '❒ Select Mode'}
                    </button>

                    {isSelectionMode && (
                        <div className="flex items-center gap-3 animate-in slide-in-from-left-4 duration-300">
                            <button 
                                onClick={toggleSelectAll}
                                className="px-4 py-2 bg-white border-3 border-dark-border rounded-xl text-[9px] font-black uppercase shadow-[4px_4px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                            >
                                {selectedIds.size === filteredCategories.length ? 'Clear Selection' : 'Select All'}
                            </button>
                            <button 
                                onClick={handleBulkDelete}
                                disabled={selectedIds.size === 0 || bulkDeleteMutation.isPending}
                                className="px-5 py-2 bg-rose-500 text-white border-3 border-dark-border rounded-xl text-[9px] font-black uppercase shadow-[4px_4px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 disabled:opacity-50 transition-all"
                            >
                                Delete Permanent ({selectedIds.size})
                            </button>
                        </div>
                    )}
                </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
            <div className="relative group flex-1 sm:flex-none">
              <input 
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search categories..."
                className="w-full sm:min-w-[280px] pl-11 pr-6 py-3 bg-white border-3 border-dark-border rounded-2xl text-xs font-black uppercase outline-none focus:translate-x-0.5 focus:translate-y-0.5 transition-all shadow-[4px_4px_0px_0px_#2b2b2b] focus:shadow-none"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</div>
            </div>

            <button 
              onClick={() => {
                setEditingCategory(null)
                setCategoryName('')
                setIsModalOpen(true)
              }}
              className="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-black shadow-[6px_6px_0px_0px_#2b2b2b] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all uppercase tracking-widest text-[10px] border-4 border-dark-border"
            >
              New Category
            </button>
          </div>
        </div>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 pt-10 md:pt-12 no-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {filteredCategories.map((cat: any) => (
          <Card 
            key={cat.id} 
            onClick={() => isSelectionMode && toggleSelect(cat.id)}
            className={`p-6 border-4 border-dark-border shadow-[6px_6px_0px_0px_#2b2b2b] bg-white group transition-all relative cursor-pointer ${
                isSelectionMode && selectedIds.has(cat.id) ? 'bg-indigo-50 border-indigo-600 -translate-y-1' : 'hover:-translate-y-1'
            }`}
          >
            {isSelectionMode && (
                <div className={`absolute top-4 right-4 w-6 h-6 rounded-lg border-3 transition-all flex items-center justify-center ${
                    selectedIds.has(cat.id) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200'
                }`}>
                    {selectedIds.has(cat.id) && '✓'}
                </div>
            )}
            
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">Department</span>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none">{cat.name}</h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4 italic">
                  Registry ID: {cat.id.slice(0, 8)}
                </span>
              </div>
              
              {!isSelectionMode && (
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleEditClick(cat); }}
                      className="p-2 bg-white rounded-xl border-3 border-slate-100 text-slate-400 hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      onClick={async (e) => {
                        e.stopPropagation();
                        const isConfirmed = await confirm({
                          title: 'Delete Category?',
                          message: `Are you sure you want to remove the "${cat.name}" category? This will not delete users but they will be unassigned.`,
                          type: 'danger',
                          confirmText: 'Remove Category'
                        })
                        if (isConfirmed) deleteMutation.mutate(cat.id)
                      }}
                      className="p-2 bg-white rounded-xl border-3 border-slate-100 text-slate-400 hover:border-rose-500 hover:text-rose-500 transition-all shadow-sm"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
              )}
            </div>
          </Card>
        ))}

        {filteredCategories.length === 0 && (
          <div className="md:col-span-2 lg:col-span-3 py-20 text-center opacity-30 grayscale">
            <div className="text-6xl mb-4">📂</div>
            <div className="text-xs font-black uppercase tracking-[0.2em]">No categories defined in registry</div>
          </div>
        )}
      </div>
    </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[2000] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <Card className="w-full max-w-md p-10 bg-white border-4 border-dark-border shadow-[12px_12px_0px_0px_#2b2b2b] animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                  {editingCategory ? 'Update Class' : 'Define Category'}
                </h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                  Organization Structural Mapping
                </p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl hover:bg-slate-100 flex items-center justify-center text-3xl transition-all">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Category Name</label>
                <input 
                  required
                  autoFocus
                  value={categoryName}
                  onChange={e => setCategoryName(e.target.value)}
                  placeholder="e.g. Frontend Engineering"
                  className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-3 border-dark-border text-xs font-black focus:bg-white transition-all outline-none"
                />
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="w-full py-5 bg-indigo-600 text-white rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] text-xs font-black uppercase tracking-[0.2em] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 border-4 border-dark-border"
                >
                  {createMutation.isPending || updateMutation.isPending ? 'Processing...' : editingCategory ? 'Sync Changes' : 'Initialize Category'}
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}
